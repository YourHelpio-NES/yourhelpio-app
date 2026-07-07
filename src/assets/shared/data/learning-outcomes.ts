import { LearningOutcomesTypeEnum } from '../constants/details-course';

export interface LearningOutcomeItem {
  id: number;
  title: string;
  type: LearningOutcomesTypeEnum;
  topic: string;
}

export const learningOutcomesMock: LearningOutcomeItem[] = [
  {
    id: 1,
    title: 'Розуміння основ алгоритмів',
    type: LearningOutcomesTypeEnum.SKILLS,
    topic: 'Сортування масивів',
  },
  {
    id: 2,
    title: 'Реалізація алгоритмів',
    type: LearningOutcomesTypeEnum.SKILLS,
    topic: 'Сортування масивів',
  },
  {
    id: 3,
    title: 'Знання принципів складності',
    type: LearningOutcomesTypeEnum.KNOWLEDGE,
    topic: 'Сортування масивів',
  },
  {
    id: 4,
    title: 'Порівнювати ефективність принципів',
    type: LearningOutcomesTypeEnum.KNOWLEDGE,
    topic: 'Сортування масивів',
  },
  {
    id: 5,
    title: 'Пояснювати, що таке тип даних',
    type: LearningOutcomesTypeEnum.KNOWLEDGE,
    topic: 'Типи даних',
  },
  {
    id: 6,
    title: 'Визначення типу даних змінної',
    type: LearningOutcomesTypeEnum.SKILLS,
    topic: 'Типи даних',
  },
];
