import { AnalysisIcon } from '../../images/icons/analytics-icon';
import { CompassIcon } from '../../images/icons/compass-icon';
import { DoneTaskIcon } from '../../images/icons/done-task-icon';
import { LayersIcon } from '../../images/icons/layers-icon';
import { StudentIcon } from '../../images/icons/student-icon';

export const detailsTabs = [
  { title: 'Огляд', link: 'overview', icon: CompassIcon },
  { title: 'Теми', link: 'topics', icon: LayersIcon },
  { title: 'Результати навчання', link: 'outcomes', icon: DoneTaskIcon },
  { title: 'Студенти', link: 'students', icon: StudentIcon },
  { title: 'Аналітика', link: 'analysis', icon: AnalysisIcon },
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

export interface TopicMaterial {
  id: number;
  fileName: string;
  isVerified: boolean;
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
