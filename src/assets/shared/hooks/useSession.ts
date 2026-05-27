import { useNavigate } from 'react-router-dom';
import { QuestionStatusEnum, type QuestionAnswer, type SessionType } from '../constants/questions';
import { useState } from 'react';

export const useTestSession = (session: SessionType) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<QuestionAnswer[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const navigate = useNavigate();

  const currentQuestion = session.questions[currentIndex];
  const totalQuestions = session.questions.length;
  const isLast = currentIndex === totalQuestions - 1;

  const getQuestionStatus = (questionId: string): QuestionStatusEnum => {
    return (
      answers.find((a) => a.questionId === questionId)?.status ?? QuestionStatusEnum.UNANSWERED
    );
  };

  const handleSubmit = () => {
    const answer: QuestionAnswer = {
      questionId: currentQuestion.id,
      answer: currentAnswer,
      status: currentAnswer.trim() ? QuestionStatusEnum.CORRECT : QuestionStatusEnum.SKIPPED,
    };

    setAnswers((prev) => [...prev, answer]);
    setCurrentAnswer('');

    if (isLast) {
      navigate('/student/study-session/results');
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleSkip = () => {
    const answer: QuestionAnswer = {
      questionId: currentQuestion.id,
      answer: '',
      status: QuestionStatusEnum.SKIPPED,
    };

    setAnswers((prev) => [...prev, answer]);
    setCurrentAnswer('');
    setCurrentIndex((prev) => prev + 1);
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      const prevAnswer = answers.find(
        (a) => a.questionId === session.questions[currentIndex - 1].id
      );
      setCurrentAnswer(String(prevAnswer?.answer ?? ''));
    }
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
  };
};
