import { useNavigate } from 'react-router-dom';
import { QuestionStatusEnum, type QuestionAnswer, type SessionType } from '../constants/questions';
import { useState } from 'react';
import showToast from '../../../components/toast/show';
import { ToastTypeEnum } from '../constants/custom-toast';

export const useTestSession = (session: SessionType) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<QuestionAnswer[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<string>('');
  const navigate = useNavigate();
  const [pendingAction, setPendingAction] = useState<null | 'submit' | 'skip'>(null);

  const currentQuestion = session.questions[currentIndex];
  const totalQuestions = session.questions.length;
  const isLast = currentIndex === totalQuestions - 1;

  const goToQuestion = (index: number) => {
    const question = session.questions[index];

    const savedAnswer = answers.find((a) => a.questionId === question.id);

    setCurrentIndex(index);

    setCurrentAnswer(
      Array.isArray(savedAnswer?.answer)
        ? savedAnswer.answer.join(', ')
        : (savedAnswer?.answer ?? '')
    );
  };

  const confirmLastAction = () => {
    if (pendingAction === 'submit') {
      handleSubmit();
    }

    if (pendingAction === 'skip') {
      handleSkip();
    }

    setPendingAction(null);
  };

  const saveAnswer = (answer: QuestionAnswer) => {
    setAnswers((prev) => {
      const exists = prev.find((a) => a.questionId === answer.questionId);

      if (exists) {
        return prev.map((a) => (a.questionId === answer.questionId ? answer : a));
      }

      return [...prev, answer];
    });
  };

  const getQuestionStatus = (questionId: string): QuestionStatusEnum => {
    return (
      answers.find((a) => a.questionId === questionId)?.status ?? QuestionStatusEnum.UNANSWERED
    );
  };

  const handleSubmit = () => {
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

    const answer: QuestionAnswer = {
      questionId: currentQuestion.id,
      answer: currentAnswer,
      status: QuestionStatusEnum.CORRECT,
    };

    saveAnswer(answer);

    if (isLast) {
      navigate('/student/study-session/results');
      return;
    }

    goToQuestion(currentIndex + 1);
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
    };

    saveAnswer(answer);

    showToast(
      ToastTypeEnum.INFO,
      `Питання #${currentIndex + 1} пропущено`,
      'Ви можете повернутися до нього пізніше.'
    );

    if (isLast) {
      navigate('/student/study-session/results');
      return;
    }

    goToQuestion(currentIndex + 1);
  };

  const handleBack = () => {
    if (currentIndex <= 0) return;

    goToQuestion(currentIndex - 1);
  };

  return {
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
