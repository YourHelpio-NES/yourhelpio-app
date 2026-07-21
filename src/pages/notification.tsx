import { useMemo, useState } from 'react';
import AppLayout from '../components/widgets/app/layout';
import {
  MOCK_NOTIFICATIONS,
  NOTIFICATION_FILTERS,
  type NotificationFilter,
} from '../assets/shared/constants/notification';
import { filterNotifications, groupByDate } from '../assets/shared/utils/notification.helper';
import { SmallText, TextBody } from '../assets/styles/typography';
import { Button } from '../components/button';
import { COLORS } from '../assets/styles/colors';
import styled from 'styled-components';
import { NotificationCard } from '../components/notification-card';
import { BasicBlock } from '../components/blocks';
import { BREAKPOINTS, media } from '../assets/styles/breakpoints';

export default function NotificationPage() {
  const [activeFilter, setActiveFilter] = useState<NotificationFilter>('all');

  const groups = useMemo(() => {
    const filtered = filterNotifications(MOCK_NOTIFICATIONS, activeFilter);
    return groupByDate(filtered);
  }, [activeFilter]);

  return (
    <AppLayout>
      <span className="d-flex flex-wrap gap-1">
        {NOTIFICATION_FILTERS.map((item, key) => (
          <Button
            $bgColor={activeFilter === item.value ? COLORS.secondary : 'transparent'}
            $txtColor={activeFilter === item.value ? COLORS.lighterBg : COLORS.text}
            $brColor={activeFilter === item.value ? COLORS.secondary : COLORS.text}
            width="auto"
            $type={'small'}
            key={key}
            onClick={() => setActiveFilter(item.value)}
          >
            <SmallText>{item.label}</SmallText>
          </Button>
        ))}
      </span>

      {!groups.length && <TextBody>Немає сповіщень</TextBody>}
      <BasicBlock>
        {groups.map((group, i) => (
          <div key={group.dateLabel}>
            {i > 0 && <Divider />}
            <Group>
              <TextBody
                $medium
                $color={
                  group.dateLabel === 'Сьогодні'
                    ? COLORS.accent
                    : group.dateLabel === 'Вчора'
                      ? COLORS.primary
                      : COLORS.secondary
                }
              >
                {group.dateLabel}
              </TextBody>
              <CardsGrid>
                {group.items.map((n) => (
                  <NotificationCard key={n.id} notification={n} />
                ))}
              </CardsGrid>
            </Group>
          </div>
        ))}
      </BasicBlock>
    </AppLayout>
  );
}

const Group = styled.div`
  margin-bottom: 1rem;
`;

export const Divider = styled.div`
  height: 0.5px;
  background: ${COLORS.boxShadow};
  width: 100%;
  margin-bottom: 1rem;
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(25%, 1fr));
  gap: 12px;
  margin-top: 8px;

  ${media(BREAKPOINTS.ml)} {
    grid-template-columns: repeat(auto-fill, minmax(49%, 1fr));
  }

  ${media(BREAKPOINTS.sm)} {
    grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
  }
`;
