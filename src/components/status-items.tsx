import styled, { css } from 'styled-components';
import { COLORS } from '../assets/styles/colors';
import { BREAKPOINTS, media } from '../assets/styles/breakpoints';

export enum StatusTypeItem {
  CIRCLE = 'circle',
}

export const StatusItem = styled.div<{
  $type?: StatusTypeItem;
  $color?: string;
  $isBackground?: boolean;
  $size?: number;
}>`
  flex-shrink: 0;
  ${({ $type, $color, $isBackground, $size }) => [
    $type === StatusTypeItem.CIRCLE &&
      css`
        width: ${$size ? `${$size}px` : '22px'};
        height: ${$size ? `${$size}px` : '22px'};
        border-radius: 50%;
        border: 1.8px solid ${$color ?? COLORS.status.error};
        background-color: ${$isBackground ? 'transparent' : ($color ?? COLORS.status.error)};

        ${media(BREAKPOINTS.xs)} {
          width: ${$size ? `${Math.max($size - 4, 8)}px` : '20px'};
          height: ${$size ? `${Math.max($size - 4, 8)}px` : '20px'};
        }
      `,
  ]}
`;

export const Line = styled.hr<{ $color?: string }>`
  height: 2px;
  color: ${({ $color }) => $color ?? COLORS.secondary};
  width: 100%;
  margin: 0;
  border-width: 2px;
`;
