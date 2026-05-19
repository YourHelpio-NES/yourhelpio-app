import { DifficultyEnum } from '../constants/course';
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
    theme: 'Динамічне програмування',
    stateRepeating: DifficultyEnum.MEDIUM,
    learning: 42,
  },
  {
    id: 2,
    course: 'Бази даних',
    theme: 'Нормалізація',
    stateRepeating: DifficultyEnum.MEDIUM,
    learning: 55,
  },
  {
    id: 3,
    course: 'Математичний аналіз',
    theme: 'Інтеграли',
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
  },
  {
    id: '2',
    name: 'Математичний аналіз',
    day: 'День 7',
    type: 'Мікротест',
    questions: 10,
    completed: false,
  },
  {
    id: '3',
    name: 'Бази даних',
    day: 'День 1',
    type: 'Короткий контроль',
    questions: 5,
    completed: false,
  },
];

export const themesTableData: ThemeTableRow[] = [
  {
    id: '1',
    themeName: 'Введення в алгоритми проєктування',
    stage: 'День 14',
    progress: '100',
  },
  {
    id: '2',
    themeName: 'Часова складність та нотація Big-O',
    stage: 'День 14',
    progress: '100',
  },
  {
    id: '3',
    themeName: 'Рекурсія та динамічне програмування',
    stage: 'День 7',
    progress: '90',
  },
  {
    id: '4',
    themeName: 'Жадібні алгоритми',
    stage: 'День 7',
    progress: '90',
  },
  {
    id: '5',
    themeName: 'Алгоритми сортування',
    stage: 'День 3',
    progress: '45',
  },
  {
    id: '6',
    themeName: 'Алгоритми пошуку',
    stage: 'День 1',
    progress: '0',
  },
  {
    id: '7',
    themeName: 'Графові алгоритми',
    // stage: "—",
    progress: '0',
  },
  {
    id: '8',
    themeName: 'Дерева та структури даних',
    // stage: "—",
    // progress: "—",
  },
  {
    id: '9',
    themeName: 'Хеш-таблиці та хешування',
    // stage: "—",
    // progress: "—",
  },
  {
    id: '10',
    themeName: 'Алгоритми на рядках',
    // stage: "—",
    // progress: "—",
  },
  {
    id: '11',
    themeName: 'Паралельні алгоритми',
    // stage: "—",
    // progress: "—",
  },
  {
    id: '12',
    themeName: 'Апроксимаційні алгоритми',
    // stage: "—",
    // progress: "—",
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
