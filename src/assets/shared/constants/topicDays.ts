export enum StudyDayEnum {
  DAY_0 = 0,
  DAY_1 = 1,
  DAY_2 = 2,
  DAY_3 = 3,
  DAY_7 = 7,
  DAY_14 = 14,
}

export enum StudyStatusEnum {
  COMPLETED = 'Завершено',
  IN_PROGRESS = 'Почати',
  PLANNED = 'Заплановано',
  MISSED = 'Пропущено',
}

export enum StudyTypeEnum {
  REPETITION = 'Повторення',
  TRAINING = 'Тренування',
  SHORT_CONTROL = 'Короткий контроль',
  FIX_ERRORS = 'Виправлення',
  REPRODUCTION = 'Відтворення + застосування',
  MICRO_TEST = 'Мікротест по темі',
  MIXED = 'Змішане завдання (2 теми)',
}

export interface StudyStage {
  day: StudyDayEnum;
  module: string;
  type: StudyTypeEnum;
  status: StudyStatusEnum;
}

export const studyDayLabels: Record<StudyDayEnum, string> = {
  [StudyDayEnum.DAY_0]: 'День 0',
  [StudyDayEnum.DAY_1]: 'День 1',
  [StudyDayEnum.DAY_2]: 'День 2',
  [StudyDayEnum.DAY_3]: 'День 3',
  [StudyDayEnum.DAY_7]: 'День 7',
  [StudyDayEnum.DAY_14]: 'День 14',
};
