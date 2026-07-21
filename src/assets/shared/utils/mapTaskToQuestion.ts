import type { Task } from '../../../api/tasks/tasks.types';
import {
  QuestionStatusEnum,
  QuestionTypeEnum,
  type Question,
  type QuestionAnswer,
} from '../constants/questions';
import type { QuizResultError } from '../constants/session';
import { BackendTaskTypeEnum } from '../constants/topicDays';

export const mapTaskToQuestion = (task: Task): Question => {
  const type =
    task.task_type === BackendTaskTypeEnum.TRUE_FALSE ||
    task.task_type === BackendTaskTypeEnum.MULTIPLE_CHOICE
      ? QuestionTypeEnum.RADIO
      : QuestionTypeEnum.TEXT;

  return {
    id: String(task.id),
    type,
    text: task.question,
    options: task.options ?? undefined,
    // correctAnswer навмисно відсутній — бекенд його приховує до відповіді
  };
};

export const buildSessionStats = (answers: QuestionAnswer[]) => {
  const totalQuestions = answers.length;
  const correctAnswers = answers.filter((a) => a.status === QuestionStatusEnum.CORRECT).length;
  const errorsCount = answers.filter((a) => a.status === QuestionStatusEnum.INCORRECT).length;
  const skippedCount = answers.filter((a) => a.status === QuestionStatusEnum.SKIPPED).length;

  const scorePercentage =
    totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

  const errors: QuizResultError[] = answers
    .filter((a) => a.status === QuestionStatusEnum.INCORRECT)
    .map((a, i) => ({
      questionId: i + 1,
      questionText: a.questionText,
      statusText: 'неправильна відповідь',
      explanation: a.result
        ? {
            questionId: i + 1,
            questionText: a.questionText,
            body: a.result.explanation,
          }
        : undefined,
    }));

  return { totalQuestions, correctAnswers, errorsCount, skippedCount, scorePercentage, errors };
};
