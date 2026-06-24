import type { JSX } from 'react';
import { DashboardIcon } from '../../images/icons/header/dashboard-icon';
import type { ImageType } from './image';
import { PlanIcon } from '../../images/icons/header/plan-icon';
import { SessionIcon } from '../../images/icons/header/session-icon';
import { MapIcon } from '../../images/icons/header/map-icon';
import { FaqIcon } from '../../images/icons/header/faq-icon';
import { SettingsIcon } from '../../images/icons/header/settings-icon';
import { StudentsIcon } from '../../images/icons/students-icon';

export enum PanelItemStudentEnum {
  DASHBOARD = 'dashboard',
  STUDY_PLAN = 'study-plan',
  STUDY_SESSION = 'study-session',
  KNOWLEDGE_TREE = 'knowledge-tree',
  FAQ = 'faq',
  SETTINGS = 'settings',
}
export enum PanelItemTeacherEnum {
  DASHBOARD = 'dashboard',
  COURSES = 'courses',
  STUDENTS = 'students',
  FAQ = 'faq',
  SETTINGS = 'settings',
}

export const panelStudentItems: Record<
  PanelItemStudentEnum,
  { name: string; icon: ({ color, size }: ImageType) => JSX.Element }
> = {
  [PanelItemStudentEnum.DASHBOARD]: {
    name: 'Головна',
    icon: DashboardIcon,
  },
  [PanelItemStudentEnum.STUDY_PLAN]: {
    name: 'План навчання',
    icon: PlanIcon,
  },
  [PanelItemStudentEnum.STUDY_SESSION]: {
    name: 'Навчальна сесія',
    icon: SessionIcon,
  },
  [PanelItemStudentEnum.KNOWLEDGE_TREE]: {
    name: 'Карта знань',
    icon: MapIcon,
  },
  [PanelItemStudentEnum.FAQ]: {
    name: 'FAQ',
    icon: FaqIcon,
  },
  [PanelItemStudentEnum.SETTINGS]: {
    name: 'Налаштування',
    icon: SettingsIcon,
  },
};
export const panelTeacherItems: Record<
  PanelItemTeacherEnum,
  { name: string; icon: ({ color, size }: ImageType) => JSX.Element }
> = {
  [PanelItemTeacherEnum.DASHBOARD]: {
    name: 'Головна',
    icon: DashboardIcon,
  },
  [PanelItemTeacherEnum.COURSES]: {
    name: 'Курси',
    icon: PlanIcon,
  },
  [PanelItemTeacherEnum.STUDENTS]: {
    name: 'Студенти',
    icon: StudentsIcon,
  },
  [PanelItemTeacherEnum.FAQ]: {
    name: 'FAQ',
    icon: FaqIcon,
  },
  [PanelItemTeacherEnum.SETTINGS]: {
    name: 'Налаштування',
    icon: SettingsIcon,
  },
};
