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
}>`
  flex-shrink: 0;
  ${({ $type, $color, $isBackground }) => [
    $type === StatusTypeItem.CIRCLE &&
      css`
        width: 22px;
        height: 22px;
        border-radius: 50%;
        border: 1.8px solid ${$color ?? COLORS.status.error};
        background-color: ${$isBackground ? 'transparent' : ($color ?? COLORS.status.error)};

        ${media(BREAKPOINTS.xs)} {
          width: 20px;
          height: 20px;
        }
      `,
  ]}
`;
