import styled, { css, keyframes } from 'styled-components';
import { StepStatusEnum, type StepCreating } from '../assets/shared/create-steps/type';
import { DoneIcon } from '../assets/images/icons/done-icon';
import { COLORS } from '../assets/styles/colors';
import { SmallText, TextBody } from '../assets/styles/typography';
import { BREAKPOINTS, media } from '../assets/styles/breakpoints';

const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 4px rgba(107,110,219,0.15); }
  50%       { box-shadow: 0 0 0 7px rgba(107,110,219,0.08); }
`;

const drawLine = keyframes`
  from { transform: scaleY(0); }
  to   { transform: scaleY(1); }
`;

// ─── Styled ───────────────────────────────────────────────────────────────────

const Wrap = styled.div`
  display: flex;
  flex-direction: column;

  /* На мобільному — горизонтальний stepper */
  /* @media (max-width: 760px) {
    flex-direction: row;
    overflow-x: auto;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
    padding-bottom: 4px;
  } */
`;

const StepItem = styled.div`
  display: flex;
  gap: 16px;
  position: relative;

  @media (max-width: 480px) {
    gap: 8px;
  }
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;

  @media (max-width: 480px) {
  }
`;

const Circle = styled.div<{ $status: StepStatusEnum }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
  transition:
    border-color 0.3s,
    background 0.3s,
    box-shadow 0.3s;

  ${({ $status }) =>
    $status === 'done' &&
    css`
      background: ${COLORS.primary};
      border: 2px solid ${COLORS.primary};
      color: ${COLORS.background};
    `}

  ${({ $status }) =>
    $status === 'active' &&
    css`
      background: ${COLORS.background};
      border: 3px solid ${COLORS.primary};
      color: ${COLORS.primary};
      animation: ${pulse} 2.5s ease infinite;

      &::after {
        content: '';
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: ${COLORS.primary};
        position: absolute;
      }
    `}
 
  ${({ $status }) =>
    $status === StepStatusEnum.PENDING &&
    css`
      background: ${COLORS.background};
      border: 2px solid ${COLORS.secondary};
      color: ${COLORS.secondary};
    `}

    ${media(BREAKPOINTS.sm)} {
    width: 32px;
    height: 32px;
    ${({ $status }) =>
      $status === 'active' &&
      css`
        &::after {
          content: '';
          width: 16px;
          height: 16px;
        }
      `}
  }
`;

const Line = styled.div<{ $done: boolean }>`
  width: 2px;
  flex: 1;
  min-height: 24px;
  /* margin: 2px 0; */
  transform-origin: top;
  animation: ${drawLine} 0.4s ease both;
  background: ${({ $done }) =>
    $done
      ? `linear-gradient(to bottom, ${COLORS.primary}, ${COLORS.secondary})`
      : COLORS.secondary};
  transition: background 0.4s ease;

  ${media(BREAKPOINTS.sm)} {
    width: 2px;
    min-height: 28px;
    /* height: 2px; */
    flex: 1;
    /* margin: 0 2px; */
    transform-origin: left;
  }
`;

const Content = styled.div`
  padding: 0px 0 30px;

  ${media(BREAKPOINTS.sm)} {
    padding: 0 12px 0 0;
    text-align: center;
  }
`;

const Title = styled(TextBody)<{ $status: StepStatusEnum }>`
  transition: color 0.3s;
  color: ${({ $status }) =>
    $status === StepStatusEnum.ACTIVE
      ? COLORS.primary
      : $status === StepStatusEnum.DONE
        ? COLORS.primary
        : COLORS.secondary};
`;

const Desc = styled(SmallText)<{ $status: StepStatusEnum }>`
  margin: 0;
  transition: color 0.3s;
  color: ${({ $status }) =>
    $status === StepStatusEnum.PENDING ? COLORS.secondary : COLORS.secondaryDark};
`;

// ─── Stepper ──────────────────────────────────────────────────────────────────

export const Stepper = ({ steps }: { steps: StepCreating[] }) => (
  <Wrap role="list" aria-label="Кроки">
    {steps.map((step, i) => {
      const isLast = i === steps.length - 1;

      return (
        <StepItem key={i} role="listitem">
          <Left>
            <Circle
              $status={step.status}
              aria-label={
                step.status === StepStatusEnum.DONE
                  ? `${step.name} — виконано`
                  : step.status === StepStatusEnum.ACTIVE
                    ? `${step.name} — поточний крок`
                    : `${step.name} — очікує`
              }
            >
              {step.status === StepStatusEnum.DONE && (
                /* іконка — заміни на свою */
                <DoneIcon color={COLORS.lighterBg} />
              )}
            </Circle>

            {!isLast && <Line $done={step.status === StepStatusEnum.DONE} aria-hidden="true" />}
          </Left>

          <Content>
            <Title
              $status={step.status}
              $medium
              aria-current={step.status === StepStatusEnum.ACTIVE ? 'step' : undefined}
            >
              {step.name}
            </Title>
            <Desc $status={step.status}>{step.description}</Desc>
          </Content>
        </StepItem>
      );
    })}
  </Wrap>
);
