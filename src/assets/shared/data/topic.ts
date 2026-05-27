import {
  StudyDayEnum,
  StudyStatusEnum,
  StudyTypeEnum,
  type StudyStage,
} from '../constants/topicDays';

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
    {
      day: StudyDayEnum.DAY_2,
      module: 'Доробка прогалин',
      type: StudyTypeEnum.FIX_ERRORS,
      status: StudyStatusEnum.PLANNED,
    },
    {
      day: StudyDayEnum.DAY_3,
      module: 'Закріплення',
      type: StudyTypeEnum.REPRODUCTION,
      status: StudyStatusEnum.PLANNED,
    },
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
  ] as StudyStage[],
};
