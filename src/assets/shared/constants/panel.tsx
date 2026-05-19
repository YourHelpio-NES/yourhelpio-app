import type { JSX } from 'react';
import { DashboardIcon } from '../../images/icons/header/dashboard-icon';
import type { ImageType } from './image';
import { PlanIcon } from '../../images/icons/header/plan-icon';
import { SessionIcon } from '../../images/icons/header/session-icon';
import { MapIcon } from '../../images/icons/header/map-icon';
import { FaqIcon } from '../../images/icons/header/faq-icon';
import { SettingsIcon } from '../../images/icons/header/settings-icon';

export enum PanelItemEnum {
  DASHBOARD = 'dashboard',
  STUDY_PLAN = 'study-plan',
  STUDY_SESSION = 'study-session',
  KNOWLEDGE_TREE = 'knowledge-tree',
  FAQ = 'faq',
  SETTINGS = 'settings',
}

export const panelItems: Record<
  PanelItemEnum,
  { name: string; icon: ({ color, size }: ImageType) => JSX.Element }
> = {
  [PanelItemEnum.DASHBOARD]: {
    name: 'Головна',
    icon: DashboardIcon,
  },
  [PanelItemEnum.STUDY_PLAN]: {
    name: 'План навчання',
    icon: PlanIcon,
  },
  [PanelItemEnum.STUDY_SESSION]: {
    name: 'Навчальна сесія',
    icon: SessionIcon,
  },
  [PanelItemEnum.KNOWLEDGE_TREE]: {
    name: 'Карта знань',
    icon: MapIcon,
  },
  [PanelItemEnum.FAQ]: {
    name: 'FAQ',
    icon: FaqIcon,
  },
  [PanelItemEnum.SETTINGS]: {
    name: 'Налаштування',
    icon: SettingsIcon,
  },
};
