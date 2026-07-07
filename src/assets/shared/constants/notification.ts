// ─── Enums ────────────────────────────────────────────────────────────────────

export type NotificationType = 'reminder' | 'achievement' | 'reply';

export type NotificationFilter = 'all' | 'learning' | 'system';

// ─── Notification ─────────────────────────────────────────────────────────────

// Базові поля — спільні для всіх типів
interface NotificationBase {
  id: number;
  type: NotificationType;
  timestamp: string; // ISO 8601, напр. "2025-06-15T10:00:00Z"
  isRead: boolean;
}

// reminder: "Повторіть тему X"
export interface ReminderNotification extends NotificationBase {
  type: 'reminder';
  topicTitle: string; // назва теми для повторення
  recommendedLabel: string; // напр. "Рекомендовано сьогодні"
  actionUrl: string;
}

// achievement: "Ви завершили тему X"
export interface AchievementNotification extends NotificationBase {
  type: 'achievement';
  topicTitle: string;
  courseTitle: string; // тег курсу, напр. "Алгоритми проєктування"
  actionUrl: string;
}

// reply: "Вам відповіли на питання"
export interface ReplyNotification extends NotificationBase {
  type: 'reply';
  replyUrl: string; // куди веде "Переглянути відповідь →"
}

export type Notification = ReminderNotification | AchievementNotification | ReplyNotification;

// ─── Grouped ──────────────────────────────────────────────────────────────────

// Після групування по даті на фронті
export interface NotificationGroup {
  dateLabel: 'Сьогодні' | 'Вчора' | 'Раніше' | string;
  items: Notification[];
}

export const NOTIFICATION_FILTERS: { value: NotificationFilter; label: string }[] = [
  { value: 'all', label: 'Всі' },
  { value: 'learning', label: 'Навчання' },
  { value: 'system', label: 'Система' },
];

// Який filter відповідає якому типу сповіщення
export const FILTER_TYPE_MAP: Record<NotificationFilter, string[] | null> = {
  all: null, // показати всі
  learning: ['achievement', 'reminder'],
  system: ['reply'],
};

// ─── Mock data ────────────────────────────────────────────────────────────────

const now = new Date();
const hoursAgo = (h: number) => new Date(now.getTime() - h * 60 * 60 * 1000).toISOString();
const daysAgo = (d: number) => new Date(now.getTime() - d * 24 * 60 * 60 * 1000).toISOString();

export const MOCK_NOTIFICATIONS: Notification[] = [
  // ── Сьогодні ────────────────────────────────────────────────────────────────
  {
    id: 1,
    type: 'reminder',
    timestamp: hoursAgo(2),
    isRead: false,
    topicTitle: 'Типи даних',
    recommendedLabel: 'Рекомендовано сьогодні',
    actionUrl: '/topics/types',
  },
  {
    id: 2,
    type: 'achievement',
    timestamp: daysAgo(1),
    isRead: true,
    topicTitle: 'Змінні',
    courseTitle: 'Алгоритми проєктування',
    actionUrl: '/topics/variables',
  },
  {
    id: 3,
    type: 'reply',
    timestamp: daysAgo(1),
    isRead: true,
    replyUrl: '/questions/42/reply',
  },
  {
    id: 4,
    type: 'reply',
    timestamp: daysAgo(1),
    isRead: false,
    replyUrl: '/questions/38/reply',
  },
  {
    id: 5,
    type: 'reminder',
    timestamp: hoursAgo(2),
    isRead: false,
    topicTitle: 'Типи даних',
    recommendedLabel: 'Рекомендовано сьогодні',
    actionUrl: '/topics/types',
  },
  {
    id: 6,
    type: 'achievement',
    timestamp: daysAgo(1),
    isRead: true,
    topicTitle: 'Змінні',
    courseTitle: 'Алгоритми проєктування',
    actionUrl: '/topics/variables',
  },
  // ── Вчора ───────────────────────────────────────────────────────────────────
  {
    id: 7,
    type: 'reminder',
    timestamp: daysAgo(1),
    isRead: true,
    topicTitle: 'Типи даних',
    recommendedLabel: 'Рекомендовано сьогодні',
    actionUrl: '/topics/types',
  },
  {
    id: 8,
    type: 'reply',
    timestamp: daysAgo(1),
    isRead: true,
    replyUrl: '/questions/35/reply',
  },
  // ── Раніше ──────────────────────────────────────────────────────────────────
  {
    id: 9,
    type: 'achievement',
    timestamp: daysAgo(5),
    isRead: true,
    topicTitle: 'Змінні',
    courseTitle: 'Алгоритми проєктування',
    actionUrl: '/topics/variables',
  },
  {
    id: 10,
    type: 'reminder',
    timestamp: daysAgo(5),
    isRead: true,
    topicTitle: 'Типи даних',
    recommendedLabel: 'Рекомендовано сьогодні',
    actionUrl: '/topics/types',
  },
];
