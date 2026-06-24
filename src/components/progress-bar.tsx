import { useEffect, useRef } from 'react';
import { SmallText, TextBody } from '../assets/styles/typography';
import { COLORS } from '../assets/styles/colors';
import styled from 'styled-components';

interface ProgressBarProps {
  value: number; // 0–100
  label?: string; // напр. "52% активні цього тижня"
  delta?: string; // напр. "+10% порівняно з минулим"
  deltaPositive?: boolean;
  showPercent?: boolean; // показати % справа на треку
}

export const ProgressBar = ({
  value,
  label,
  delta,
  deltaPositive = true,
  showPercent = true,
}: ProgressBarProps) => {
  const fillRef = useRef<HTMLDivElement>(null);
  const clamped = Math.min(100, Math.max(0, value));

  // анімація при монтуванні — double rAF щоб браузер встиг застосувати width: 0
  useEffect(() => {
    const id1 = requestAnimationFrame(() => {
      const id2 = requestAnimationFrame(() => {
        if (fillRef.current) fillRef.current.style.width = `${clamped}%`;
      });
      return () => cancelAnimationFrame(id2);
    });
    return () => cancelAnimationFrame(id1);
  }, [clamped]);

  return (
    <div className="d-flex flex-column gap-1">
      {label && <TextBody $medium>{label}</TextBody>}
      {delta && (
        <TextBody style={{ color: deltaPositive ? COLORS.status.success : COLORS.status.error }}>
          {delta}
        </TextBody>
      )}

      <Track>
        <Fill
          ref={fillRef}
          role="progressbar"
          aria-valuenow={clamped}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={label ?? `${clamped}%`}
        />
        {showPercent && (
          <PercentLabel $medium aria-hidden="true" $percent={value}>
            {clamped}%
          </PercentLabel>
        )}
      </Track>
    </div>
  );
};

const Track = styled.div`
  position: relative;
  height: 24px;
  background: transparent;
  border: 0.5px solid ${COLORS.secondaryDark};
  border-radius: 100px;
  overflow: hidden;
`;

const Fill = styled.div`
  height: 100%;
  border-radius: 100px;
  background: ${COLORS.secondary};
  border: 3.5px solid ${COLORS.lighterBg};
  width: 0%;
  transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
`;

const PercentLabel = styled(SmallText)<{ $percent?: number }>`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ $percent }) => ($percent === 100 ? COLORS.lighterBg : COLORS.secondaryDark)};
  pointer-events: none;
`;
