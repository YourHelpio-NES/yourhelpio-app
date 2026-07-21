import styled from 'styled-components';
import type {
  AchievementNotification,
  Notification,
  ReminderNotification,
  ReplyNotification,
} from '../assets/shared/constants/notification';
import { getRelativeTime } from '../assets/shared/utils/notification.helper';
import { ArrowIcon } from '../assets/images/icons/arrow-icon';
import { SmallText, TextBody } from '../assets/styles/typography';
import { Button } from './button';
import { COLORS } from '../assets/styles/colors';

import bellIcon from '../assets/images/icons/bell-icon.png';
import graphicIcon from '../assets/images/icons/graphics-icon.png';
import incomeMailIcon from '../assets/images/icons/income-mail-icon.png';
import { BREAKPOINTS, media } from '../assets/styles/breakpoints';

const Card = styled.div`
  background: ${COLORS.lighterBg};
  border: 0.5px solid ${COLORS.boxShadow};
  border-radius: 12px;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
`;

const CardIcon = styled.img`
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  margin-top: 1px;

  ${media(BREAKPOINTS.sm)} {
    width: 16px;
    height: 16px;
  }
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  flex-wrap: wrap;
`;

const ReminderFooter = ({ n }: { n: ReminderNotification }) => (
  <>
    <Button
      $type="text"
      $bgColor={'transparent'}
      $txtColor={COLORS.primary}
      $brColor={COLORS.secondary}
      onClick={() => window.location.assign(n.actionUrl)}
    >
      <SmallText $medium>{n.recommendedLabel}</SmallText>
    </Button>
    <Button
      $type="small"
      $bgColor={COLORS.secondary}
      $brColor={COLORS.secondary}
      onClick={() => window.location.assign(n.actionUrl)}
    >
      <SmallText>Перейти</SmallText>
    </Button>
  </>
);

const AchievementFooter = ({ n }: { n: AchievementNotification }) => (
  <>
    <Button
      $bgColor={COLORS.lighterBg}
      $txtColor={COLORS.text}
      $brColor={COLORS.secondary}
      width="auto"
      $type={'small'}
    >
      <SmallText>{n.courseTitle}</SmallText>
    </Button>
    <Button
      $type="small"
      $bgColor={COLORS.secondary}
      $brColor={COLORS.secondary}
      onClick={() => window.location.assign(n.actionUrl)}
    >
      <SmallText>Перейти</SmallText>
    </Button>
  </>
);

const ReplyFooter = ({ n }: { n: ReplyNotification }) => (
  <Button
    $type="small"
    $bgColor={COLORS.secondary}
    $brColor={COLORS.secondary}
    onClick={() => window.location.assign(n.replyUrl)}
  >
    <SmallText>Переглянути відповідь</SmallText>
    <ArrowIcon color={COLORS.background} direction="right" size={16} />
  </Button>
);

const NOTIFICATION_CONFIG: Record<
  Notification['type'],
  { icon: string; getTitle: (n: Notification) => string }
> = {
  reminder: {
    icon: bellIcon,
    getTitle: (n) => `Повторіть тему "${(n as AchievementNotification).topicTitle}"`,
  },
  achievement: {
    icon: graphicIcon,
    getTitle: (n) => `Ви завершили тему "${(n as AchievementNotification).topicTitle}"`,
  },
  reply: { icon: incomeMailIcon, getTitle: () => 'Вам відповіли на питання' },
};

export const NotificationCard = ({ notification: n }: { notification: Notification }) => {
  const { icon, getTitle } = NOTIFICATION_CONFIG[n.type];

  return (
    <Card>
      <CardHeader>
        <CardIcon aria-hidden="true" src={icon} />
        <TextBody $medium>{getTitle(n)}</TextBody>
        <SmallText className="ms-auto text-nowrap">{getRelativeTime(n.timestamp)}</SmallText>
      </CardHeader>

      <CardFooter>
        {n.type === 'reminder' && <ReminderFooter n={n} />}
        {n.type === 'achievement' && <AchievementFooter n={n} />}
        {n.type === 'reply' && <ReplyFooter n={n} />}
      </CardFooter>
    </Card>
  );
};
