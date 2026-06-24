import { DifficultyEnum, type WeakTopic } from '../constants/course';
import type { TaskTableRow, ThemeTableRow } from '../utils/table/row-type';

export const coursesProgressData = [
  {
    id: 1,
    title: 'Алгоритми проєктування',
    progress: 65,
    completedTopics: 8,
    totalTopics: 12,
    averageResult: 82,
  },
  {
    id: 2,
    title: 'Математичний аналіз',
    progress: 65,
    completedTopics: 8,
    totalTopics: 12,
    averageResult: 54,
  },
  {
    id: 3,
    title: 'Бази даних',
    progress: 65,
    completedTopics: 8,
    totalTopics: 12,
    averageResult: 26,
  },
];

export const extremelyRepeating = [
  {
    id: 1,
    course: 'Алгоритми проєктування',
    topic: 'Динамічне програмування',
    stateRepeating: DifficultyEnum.MEDIUM,
    learning: 42,
  },
  {
    id: 2,
    course: 'Бази даних',
    topic: 'Нормалізація',
    stateRepeating: DifficultyEnum.MEDIUM,
    learning: 55,
  },
  {
    id: 3,
    course: 'Математичний аналіз',
    topic: 'Інтеграли',
    stateRepeating: DifficultyEnum.HIGH,
    learning: 38,
  },
];

export const tasks: TaskTableRow[] = [
  {
    id: '1',
    name: 'Алгоритми проєктування',
    day: 'День 0',
    type: 'Повторення',
    questions: 8,
    completed: true,
    duration: 20,
  },
  {
    id: '2',
    name: 'Математичний аналіз',
    day: 'День 7',
    type: 'Мікротест',
    questions: 10,
    completed: false,
    duration: 5,
  },
  {
    id: '3',
    name: 'Бази даних',
    day: 'День 1',
    type: 'Короткий контроль',
    questions: 5,
    completed: false,
    duration: 10,
  },
];

export const topicsTableData: ThemeTableRow[] = [
  {
    id: '1',
    topicName: 'Введення в алгоритми проєктування',
    stage: 'День 14',
    progress: '100',
  },
  {
    id: '2',
    topicName: 'Часова складність та нотація Big-O',
    stage: 'День 14',
    progress: '100',
  },
  {
    id: '3',
    topicName: 'Рекурсія та динамічне програмування',
    stage: 'День 7',
    progress: '90',
  },
  {
    id: '4',
    topicName: 'Жадібні алгоритми',
    stage: 'День 7',
    progress: '90',
  },
  {
    id: '5',
    topicName: 'Алгоритми сортування',
    stage: 'День 3',
    progress: '45',
  },
  {
    id: '6',
    topicName: 'Алгоритми пошуку',
    stage: 'День 1',
    progress: '0',
  },
  {
    id: '7',
    topicName: 'Графові алгоритми',
    progress: '0',
  },
  {
    id: '8',
    topicName: 'Дерева та структури даних',
  },
  {
    id: '9',
    topicName: 'Хеш-таблиці та хешування',
  },
  {
    id: '10',
    topicName: 'Алгоритми на рядках',
  },
  {
    id: '11',
    topicName: 'Паралельні алгоритми',
  },
  {
    id: '12',
    topicName: 'Апроксимаційні алгоритми',
  },
];

export const learningOutcomesTheme: string[] = [
  'Розуміє принципи роботи основних алгоритмів сортування',
  'Вміє реалізувати Bubble Sort, Merge Sort та Quick Sort',
  'Аналізує часову та просторову складність алгоритмів сортування',
  'Обирає оптимальний алгоритм сортування залежно від задачі',
  'Порівнює ефективність алгоритмів на різних типах вхідних даних',
];

export const keywordsTheme: string[] = [
  'Bubble Sort',
  'Merge Sort',
  'Quick Sort',
  'Insertion Sort',
  'Heap Sort',
  'Big-O',
  'порівняння елементів',
  'розділяй і володарюй',
  'стабільне сортування',
  'in-place сортування',
];

export const WEAK_TOPICS: WeakTopic[] = [
  {
    id: 1,
    title: 'Типи даних',
    course: 'Алгоритми проєктування',
    masteryPercent: 45,
    weeklyDelta: -10,
    studentCount: 31,
    description:
      'Тема для студентів допоможе визначити тему тип даних, теорія, як їх використовувати на практиці та вміти вільно пояснити всі терміни по темі.',
  },
  {
    id: 2,
    title: 'Boolean',
    course: 'Алгоритми проєктування',
    masteryPercent: 48,
    weeklyDelta: null,
    studentCount: 28,
    description:
      'Студенти мають розуміти логічний тип даних Boolean, вміти використовувати його в умовних виразах та пояснювати різницю між true і false.',
  },
  {
    id: 3,
    title: 'Інтеграли',
    course: 'Математичний аналіз',
    masteryPercent: 55,
    weeklyDelta: null,
    studentCount: 24,
    description:
      'Тема охоплює визначені та невизначені інтеграли. Студенти мають навчитися застосовувати основні методи інтегрування та розуміти геометричний зміст інтеграла.',
  },
  {
    id: 4,
    title: 'Нормалізація',
    course: 'Бази даних',
    masteryPercent: 65,
    weeklyDelta: null,
    studentCount: 19,
    description:
      'Студенти вивчають нормальні форми баз даних (1НФ–3НФ), вміють визначати надлишковість даних та приводити таблиці до нормалізованого вигляду.',
  },
];

export const topicsTeacherTableData: ThemeTableRow[] = [
  {
    id: '1',
    topicName: 'Введення в алгоритми проєктування',
    stage: 'День 14',
    progress: '100',
  },
  {
    id: '2',
    topicName: 'Часова складність та нотація Big-O',
    stage: 'День 14',
    progress: '100',
  },
  {
    id: '3',
    topicName: 'Рекурсія та динамічне програмування',
    stage: 'День 7',
    progress: '90',
  },
  {
    id: '4',
    topicName: 'Жадібні алгоритми',
    stage: 'День 7',
    progress: '90',
  },
  {
    id: '5',
    topicName: 'Алгоритми сортування',
    stage: 'День 3',
    progress: '45',
  },
  {
    id: '6',
    topicName: 'Алгоритми пошуку',
    stage: 'День 1',
    progress: '0',
  },
  {
    id: '7',
    topicName: 'Графові алгоритми',
    progress: '0',
  },
  {
    id: '8',
    topicName: 'Дерева та структури даних',
  },
  {
    id: '9',
    topicName: 'Хеш-таблиці та хешування',
  },
  {
    id: '10',
    topicName: 'Алгоритми на рядках',
  },
  {
    id: '11',
    topicName: 'Паралельні алгоритми',
  },
  {
    id: '12',
    topicName: 'Апроксимаційні алгоритми',
  },
];
