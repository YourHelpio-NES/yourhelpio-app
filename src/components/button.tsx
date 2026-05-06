import styled, { css } from 'styled-components';
import { COLORS } from '../assets/styles/colors';

export const Button = styled.button<{
  $bgColor?: string;
  $txtColor?: string;
  $brColor?: string;
  $brRadius?: string;
  $brWidth?: string;
  width?: string;
  type?: 'large' | 'small' | 'text';
}>`
  width: ${({ width }) => width ?? 'auto'};
  background-color: ${({ $bgColor }) => $bgColor ?? COLORS.accent};
  color: ${({ $txtColor }) => $txtColor ?? COLORS.background};
  border: ${({ type, $brColor, $brWidth }) =>
    type === 'text' ? 'none' : `${$brWidth ?? 1}px solid ${$brColor ?? COLORS.accent}`};
  border-radius: ${({ $brRadius }) => `${$brRadius ?? 24}px`};
  padding: ${({ type }) => (type === 'text' ? '4px' : type === 'small' ? '6px 20px' : '12px 24px')};
  outline: none;
  transition: all 300ms cubic-bezier(0.25, 0.1, 0.25, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    opacity: 0.8;
  }
  &:active {
    transform: scale(0.98);
  }

  p {
    color: ${({ $txtColor }) => $txtColor ?? COLORS.background};
    text-align: center;
  }
  img {
    width: 24px;
    height: 24px;
  }
`;

export const boxShadow = css``;
