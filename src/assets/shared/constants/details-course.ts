import { AnalysisIcon } from '../../images/icons/analytics-icon';
import { CompassIcon } from '../../images/icons/compass-icon';
import { DoneTaskIcon } from '../../images/icons/done-task-icon';
import { LayersIcon } from '../../images/icons/layers-icon';
import { StudentIcon } from '../../images/icons/student-icon';

export const detailsTabs = [
  { title: 'Огляд', link: 'overview', icon: CompassIcon },
  { title: 'Теми', link: 'topics', icon: LayersIcon },
  { title: 'Результати навчання', link: 'learning-outcomes', icon: DoneTaskIcon },
  { title: 'Студенти', link: 'students', icon: StudentIcon },
  { title: 'Аналітика', link: 'analytics', icon: AnalysisIcon },
];

export enum TopicDetailsStatusEnum {
  APPROVED = 'Схвалено',
  IN_PROGRESS = 'В обробці',
  DONE = 'Готово',
  NO_MATERIALS = 'Немає матеріалів',
}

export interface LearningOutcome {
  id: number;
  text: string;
  level: number;
  isVerified: boolean;
}

export enum TopicMaterialEnum {
  DONE = 'done',
  PROCESS = 'process',
  CANCEL = 'cancel',
}

export const TOPIC_VERIFICATION_TEXT: Record<TopicMaterialEnum, string> = {
  [TopicMaterialEnum.DONE]: 'Файли завантажено успішно, дані згенеровано та підтверджено',
  [TopicMaterialEnum.PROCESS]: 'Генерація триває...',
  [TopicMaterialEnum.CANCEL]: 'Завантажте матеріали, щоб згенерувати паспорт теми',
};

export interface TopicMaterial {
  id: number;
  fileName: string;
  verified: TopicMaterialEnum;
}

export interface TopicDetailTeacher {
  id: string;
  topicName: string;
  status: TopicDetailsStatusEnum;
  description: string;
  learningOutcomes: LearningOutcome[];
  keyTerms: string[];
  keyTermsVerified: boolean;
  materials: TopicMaterial[];
  materialsNote: string;
}

export interface TopicDetailTeacherRow {
  id: string;
  topicName: string;
  status: TopicDetailsStatusEnum;
}

export interface TopicProblemTeacherRow {
  id: number;
  topicName: string;
  group: string;
  level: number;
}

export enum LearningOutcomesTypeEnum {
  KNOWLEDGE = 'knowledge',
  SKILLS = 'skills',
  COMPETENCIES = 'competencies',
  ALL = 'all',
}

export const learningOutcomesTypes: Record<LearningOutcomesTypeEnum, string> = {
  [LearningOutcomesTypeEnum.ALL]: 'Усі',
  [LearningOutcomesTypeEnum.COMPETENCIES]: 'Компетенції',
  [LearningOutcomesTypeEnum.SKILLS]: 'Навички',
  [LearningOutcomesTypeEnum.KNOWLEDGE]: 'Знання',
};
