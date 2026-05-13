import styled from 'styled-components';
import { COLORS } from '../assets/styles/colors';

export const BasicBlock = styled.div<{ width?: string; $gap?: string; $bgColor?: string }>`
  display: flex;
  flex-direction: column;
  gap: ${({ $gap }) => $gap ?? '16px'};
  width: ${({ width }) => width ?? '100%'};
  background-color: ${({ $bgColor }) => $bgColor ?? COLORS.background};
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
