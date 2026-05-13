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
  disabled?: boolean;
}>`
  width: ${({ width }) => width ?? 'auto'};
  background-color: ${({ disabled, $bgColor }) =>
    disabled ? COLORS.secondary : ($bgColor ?? COLORS.accent)};
  color: ${({ disabled, $txtColor }) =>
    disabled ? COLORS.text : ($txtColor ?? COLORS.background)};
  border: ${({ type, disabled, $brColor, $brWidth }) =>
    type === 'text'
      ? 'none'
      : `${$brWidth ?? 1}px solid ${disabled ? COLORS.secondary : ($brColor ?? COLORS.accent)}`};

  border-radius: ${({ $brRadius }) => `${$brRadius ?? 24}px`};

  padding: ${({ type }) => (type === 'text' ? '4px' : type === 'small' ? '6px 20px' : '12px 24px')};

  outline: none;
  transition: all 300ms cubic-bezier(0.25, 0.1, 0.25, 1);

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;

  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  &:hover:not(:disabled) {
    opacity: 0.8;
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.7;
  }

  p {
    color: ${({ disabled, $txtColor }) =>
      disabled ? COLORS.text : ($txtColor ?? COLORS.background)};

    text-align: center;
  }

  img,
  svg {
    width: 24px;
    height: 24px;
    opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  }
`;

export const boxShadow = css``;
