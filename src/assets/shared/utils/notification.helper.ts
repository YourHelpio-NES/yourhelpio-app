import {
  FILTER_TYPE_MAP,
  type Notification,
  type NotificationFilter,
  type NotificationGroup,
} from '../constants/notification';

export function getRelativeTime(isoString: string): string {
  const diff = Date.now() - new Date(isoString).getTime();
  const minutes = Math.floor(diff / 60_000);
  const hours = Math.floor(diff / 3_600_000);
  const days = Math.floor(diff / 86_400_000);

  if (minutes < 1) return 'щойно';
  if (minutes < 60) return `${minutes} хв тому`;
  if (hours < 24) return `${hours} год тому`;
  if (days === 1) return 'Вчора';
  return `${days} дн тому`;
}

function getDateLabel(isoString: string): string {
  const diff = Date.now() - new Date(isoString).getTime();
  const days = Math.floor(diff / 86_400_000);

  if (days === 0) return 'Сьогодні';
  if (days === 1) return 'Вчора';
  return 'Раніше';
}

export function filterNotifications(
  items: Notification[],
  filter: NotificationFilter
): Notification[] {
  const types = FILTER_TYPE_MAP[filter];
  if (!types) return items;
  return items.filter((n) => types.includes(n.type));
}

export function groupByDate(items: Notification[]): NotificationGroup[] {
  const ORDER = ['Сьогодні', 'Вчора', 'Раніше'];
  const map = new Map<string, Notification[]>();

  for (const item of items) {
    const label = getDateLabel(item.timestamp);
    if (!map.has(label)) map.set(label, []);
    map.get(label)!.push(item);
  }

  return ORDER.filter((label) => map.has(label)).map((label) => ({
    dateLabel: label,
    items: map.get(label)!,
  }));
}
