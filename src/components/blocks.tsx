import styled, { css } from 'styled-components';
import { COLORS } from '../assets/styles/colors';
import { BREAKPOINTS, media } from '../assets/styles/breakpoints';

export const BasicBlock = styled.div<{
  width?: string;
  $gap?: string;
  $bgColor?: string;
  $direction?: 'column' | 'row';
}>`
  display: flex;
  flex-direction: ${({ $direction }) => $direction ?? 'column'};
  gap: ${({ $gap }) => $gap ?? '16px'};
  width: ${({ width }) => width ?? '100%'};
  background-color: ${({ $bgColor }) => $bgColor ?? COLORS.background};

  min-width: 0;

  ${media(BREAKPOINTS.ml)} {
    width: 100%;
  }

  ${media(BREAKPOINTS.md)} {
    width: 100%;
  }
`;

export const Wrapper = styled.div`
  background-color: ${COLORS.background};
  width: 100%;
  min-height: 100vh;
  padding-bottom: 60px;

  &::selection {
    color: ${COLORS.background};
    background: ${COLORS.accent};
  }
`;

export const ButtonsRow = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;

  ${media(BREAKPOINTS.xs)} {
    flex-direction: column;
    gap: 8px;
    button {
      width: 100%;
    }
  }
`;

export const basicShadow = css`
  box-shadow: 0 1px 4px ${COLORS.boxShadow};
`;

export const hoverBoxShadow = css`
  box-shadow:
    0 6px 16px rgba(12, 12, 13, 0.08),
    0 2px 8px rgba(12, 12, 13, 0.05);
`;

export const actionEffect = css`
  transition:
    transform 280ms cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1),
    background-color 280ms ease;

  will-change: transform;

  &:hover {
    transform: translateY(-2px);
    ${hoverBoxShadow};
  }

  &:active {
    transform: translateY(-1px) scale(0.99);
  }
`;
