import styled from 'styled-components';
import { COLORS } from '../assets/styles/colors';
import { TextBody } from '../assets/styles/typography';

const TimerWrap = styled.span<{ $isLow: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 999px;
  border: 1.5px solid ${({ $isLow }) => ($isLow ? COLORS.status.error : COLORS.secondary)};
  color: ${({ $isLow }) => ($isLow ? COLORS.status.error : COLORS.text)};
`;

export const QuestionTimer = ({
  formatted,
  secondsLeft,
}: {
  formatted: string;
  secondsLeft: number;
}) => {
  return (
    <TimerWrap $isLow={secondsLeft <= 10}>
      <TextBody $medium>{formatted}</TextBody>
    </TimerWrap>
  );
};
