import { useNavigate } from 'react-router-dom';
import {
  QuestionStatusEnum,
  type Question,
  type QuestionAnswer,
  type StudentProgressResponse,
} from '../constants/questions';
import { useCallback, useEffect, useState } from 'react';
import showToast from '../../../components/toast/show';
import { ToastTypeEnum } from '../constants/custom-toast';
import { getErrorMessage } from '../utils/getErrorMessage';
import { tasksApi, topicsApi } from '../../../api/tasks/tasks.api';
import { mapTaskToQuestion } from '../utils/mapTaskToQuestion';

export const useTestSession = (topicId: number) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [taskIdByQuestionId, setTaskIdByQuestionId] = useState<Record<string, number>>({});
  const [timeLimitSeconds, setTimeLimitSeconds] = useState(0);
  const [nextReviewAt, setNextReviewAt] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<QuestionAnswer[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<string>('');
  const [pendingAction, setPendingAction] = useState<null | 'submit' | 'skip'>(null);

  const navigate = useNavigate();

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const isLast = currentIndex === totalQuestions - 1;

  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await topicsApi.getTopicsToday(topicId);

      setTimeLimitSeconds(data.time_limit_seconds);
      setNextReviewAt(data.next_review_at);

      const mappedQuestions = data.tasks.map(mapTaskToQuestion);
      setQuestions(mappedQuestions);

      const idMap: Record<string, number> = {};
      data.tasks.forEach((t) => {
        idMap[String(t.id)] = t.id;
      });
      setTaskIdByQuestionId(idMap);
    } catch (err: unknown) {
      showToast(
        ToastTypeEnum.ERROR,
        'Помилка',
        getErrorMessage(err, 'Не вдалося завантажити завдання')
      );
    } finally {
      setIsLoading(false);
    }
  }, [topicId]);

  useEffect(() => {
    void (async () => {
      await fetchTasks();
    })();
  }, [fetchTasks]);

  const goToQuestion = (index: number) => {
    const question = questions[index];
    const savedAnswer = answers.find((a) => a.questionId === question.id);

    setCurrentIndex(index);
    setCurrentAnswer(
      Array.isArray(savedAnswer?.answer)
        ? savedAnswer.answer.join(', ')
        : (savedAnswer?.answer ?? '')
    );
  };

  const confirmLastAction = () => {
    if (pendingAction === 'submit') void handleSubmit();
    if (pendingAction === 'skip') handleSkip();
    setPendingAction(null);
  };

  const saveAnswer = (answer: QuestionAnswer) => {
    setAnswers((prev) => {
      const exists = prev.find((a) => a.questionId === answer.questionId);
      if (exists) return prev.map((a) => (a.questionId === answer.questionId ? answer : a));
      return [...prev, answer];
    });
  };

  const getQuestionStatus = (questionId: string): QuestionStatusEnum => {
    return (
      answers.find((a) => a.questionId === questionId)?.status ?? QuestionStatusEnum.UNANSWERED
    );
  };

  const completeSession = async (): Promise<StudentProgressResponse | null> => {
    try {
      const { data } = await tasksApi.completeSession(topicId);
      return data;
    } catch (err: unknown) {
      showToast(ToastTypeEnum.ERROR, 'Помилка', getErrorMessage(err, 'Не вдалося завершити сесію'));
      return null;
    }
  };

  const handleSubmit = async () => {
    if (!currentAnswer.trim()) {
      showToast(
        ToastTypeEnum.WARNING,
        'Відповідь не заповнена',
        'Введіть відповідь або натисніть на "Не знаю відповіді".'
      );
      return;
    }

    if (isLast && !pendingAction) {
      setPendingAction('submit');
      return;
    }

    const taskId = taskIdByQuestionId[currentQuestion.id];
    setIsSubmitting(true);
    try {
      const { data } = await tasksApi.submitAnswer(taskId, { answer: currentAnswer });

      const answer: QuestionAnswer = {
        questionId: currentQuestion.id,
        answer: currentAnswer,
        status: data.is_correct ? QuestionStatusEnum.CORRECT : QuestionStatusEnum.INCORRECT,
        questionText: currentQuestion.text,
        result: data,
      };
      saveAnswer(answer);

      if (isLast) {
        const progress = await completeSession();
        navigate('/student/study-session/results', {
          state: { answers: [...answers, answer], progress },
        });
        return;
      }

      goToQuestion(currentIndex + 1);
    } catch (err: unknown) {
      showToast(
        ToastTypeEnum.ERROR,
        'Помилка',
        getErrorMessage(err, 'Не вдалося надіслати відповідь')
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = () => {
    if (isLast && !pendingAction) {
      setPendingAction('skip');
      return;
    }

    const answer: QuestionAnswer = {
      questionId: currentQuestion.id,
      answer: '',
      status: QuestionStatusEnum.SKIPPED,
      questionText: currentQuestion.text,
    };
    saveAnswer(answer);

    showToast(
      ToastTypeEnum.INFO,
      `Питання #${currentIndex + 1} пропущено`,
      'Ви можете повернутися до нього пізніше.'
    );

    if (isLast) {
      void completeSession().then((progress) => {
        navigate('/student/study-session/results', {
          state: { answers: [...answers, answer], progress },
        });
      });
      return;
    }

    goToQuestion(currentIndex + 1);
  };

  const handleBack = () => {
    if (currentIndex <= 0) return;
    goToQuestion(currentIndex - 1);
  };

  // анти-чіт: перемикання вкладки під час сесії
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        tasksApi.recordTabSwitch(topicId).catch(() => {});
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [topicId]);

  return {
    isLoading,
    isSubmitting,
    isEmpty: !isLoading && totalQuestions === 0,
    nextReviewAt,
    questions,
    timeLimitSeconds,
    currentQuestion,
    currentIndex,
    setCurrentIndex,
    totalQuestions,
    currentAnswer,
    setCurrentAnswer,
    answers,
    isLast,
    handleSubmit,
    handleSkip,
    handleBack,
    getQuestionStatus,
    pendingAction,
    setPendingAction,
    confirmLastAction,
  };
};
