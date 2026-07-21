export enum StudyDayEnum {
  DAY_0 = 0,
  DAY_1 = 1,
  DAY_3 = 3,
  DAY_7 = 7,
  DAY_14 = 14,
}

export enum StudyTypeEnum {
  REPETITION = 'REPETITION',
  TRAINING = 'TRAINING',
  SHORT_CONTROL = 'SHORT_CONTROL',
  MICRO_TEST = 'MICRO_TEST',
  MIXED = 'MIXED',
  FIX_ERRORS = 'FIX_ERRORS', // особливий стан, не прив'язаний до дня
}

export enum StudyStatusEnum {
  COMPLETED = 'COMPLETED',
  IN_PROGRESS = 'IN_PROGRESS',
  PLANNED = 'PLANNED',
}

// stage (0-4, реальне поле з бекенду StudentProgress) → лейбли для UI
// day і порядок — реальні (STAGE_DAYS з бекенду), module/type — дизайн-рішення фронта
export const STAGE_DEFINITIONS = [
  { stage: 0, day: StudyDayEnum.DAY_0, module: 'Основний модуль', type: StudyTypeEnum.REPETITION },
  { stage: 0, day: StudyDayEnum.DAY_0, module: 'Основний модуль', type: StudyTypeEnum.TRAINING },
  {
    stage: 1,
    day: StudyDayEnum.DAY_1,
    module: 'Швидка перевірка',
    type: StudyTypeEnum.SHORT_CONTROL,
  },
  { stage: 2, day: StudyDayEnum.DAY_3, module: 'Закріплення', type: StudyTypeEnum.TRAINING },
  {
    stage: 3,
    day: StudyDayEnum.DAY_7,
    module: 'Тижневий контроль',
    type: StudyTypeEnum.MICRO_TEST,
  },
  { stage: 4, day: StudyDayEnum.DAY_14, module: 'Перенесення знань', type: StudyTypeEnum.MIXED },
] as const;

export const topicDetailsMock = {
  title: ['Алгоритми проєктування', 'Типи даних'],
  progress: 80,

  learningOutcomes: [
    'Пояснювати, що таке тип даних',
    'Розрізняти основні типи даних',
    'Визначати тип даних змінної',
    'Використовувати різні типи даних у простих прикладах.',
  ],

  keywords: ['змінна', 'присвоєння', 'оголошення', 'вираз', 'ціле число', 'рядок', 'логічний тип'],

  shortInfo: {
    description:
      'Типи даних — це спосіб визначити, які значення зберігає змінна і як з ними можна працювати.',
    items: [
      'Integer — цілі числа',
      'Float — дробові числа',
      'String — текст',
      'Boolean — true / false',
    ],
    conclusion:
      "Тип даних визначає, які операції можна виконувати та як дані зберігаються в пам'яті.",
  },

  stages: [
    {
      day: StudyDayEnum.DAY_0,
      module: 'Основний модуль',
      type: StudyTypeEnum.REPETITION,
      status: StudyStatusEnum.COMPLETED,
    },
    {
      day: StudyDayEnum.DAY_0,
      module: 'Основний модуль',
      type: StudyTypeEnum.TRAINING,
      status: StudyStatusEnum.COMPLETED,
    },
    {
      day: StudyDayEnum.DAY_1,
      module: 'Швидка перевірка',
      type: StudyTypeEnum.SHORT_CONTROL,
      status: StudyStatusEnum.IN_PROGRESS,
    },
    // {
    //   day: StudyDayEnum.DAY_2,
    //   module: 'Доробка прогалин',
    //   type: StudyTypeEnum.FIX_ERRORS,
    //   status: StudyStatusEnum.PLANNED,
    // },
    // {
    //   day: StudyDayEnum.DAY_3,
    //   module: 'Закріплення',
    //   type: StudyTypeEnum.REPRODUCTION,
    //   status: StudyStatusEnum.PLANNED,
    // },
    {
      day: StudyDayEnum.DAY_7,
      module: 'Тижневий контроль',
      type: StudyTypeEnum.MICRO_TEST,
      status: StudyStatusEnum.PLANNED,
    },
    {
      day: StudyDayEnum.DAY_14,
      module: 'Перенесення знань',
      type: StudyTypeEnum.MIXED,
      status: StudyStatusEnum.PLANNED,
    },
  ],
};

// export const FAQ_QUESTIONS: FaqQuestion[] = [
//   {
//     id: 0,
//     question: 'Що таке тип даних?',
//     type: FilterTypesFaq.THEORY,
//     topic: null,
//     answer: null,
//   },
//   {
//     id: 1,
//     question: 'Для чого використовується Boolean?',
//     type: FilterTypesFaq.THEORY,
//     topic: 'Алгоритми проєктування',
//     answer: 'Для перевірки умов. Має лише два значення: true або false.',
//   },
//   {
//     id: 2,
//     question: 'Чому важливо правильно обирати тип даних?',
//     type: FilterTypesFaq.PRACTICE,
//     topic: null,
//     answer: null,
//   },
// ];
