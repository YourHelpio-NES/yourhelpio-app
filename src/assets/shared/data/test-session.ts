import { QuestionTypeEnum, type SessionType } from '../constants/questions';

export const testSessionMock: SessionType = {
  id: '1',
  title: 'Алгоритми проєктування / Типи даних',
  stage: 'День 1',
  moduleTitle: 'Швидка перевірка – Короткий контроль',
  questions: [
    {
      id: '1',
      type: QuestionTypeEnum.TEXT,
      text: 'Що таке змінна?',
      hint: 'Напишіть коротке визначення (1–2 речення)',
    },
    {
      id: '2',
      type: QuestionTypeEnum.TEXT,
      text: 'Що таке тип даних?',
      hint: 'Напишіть коротке визначення (1–2 речення)',
    },
    {
      id: '3',
      type: QuestionTypeEnum.TEXT,
      text: 'Назвіть основні типи даних.',
      hint: 'Перерахуйте щонайменше 3 типи',
    },
    {
      id: '4',
      type: QuestionTypeEnum.TEXT,
      text: 'Чим відрізняється Integer від Float?',
      hint: 'Напишіть коротке пояснення',
    },
    {
      id: '5',
      type: QuestionTypeEnum.TEXT,
      text: 'Що означає логічний тип Boolean?',
      hint: 'Напишіть коротке визначення',
    },
  ],
};
