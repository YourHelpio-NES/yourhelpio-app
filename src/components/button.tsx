import styled, { css } from 'styled-components';
import { COLORS } from '../assets/styles/colors';
import { basicShadow, hoverBoxShadow } from './blocks';
import { BREAKPOINTS, media } from '../assets/styles/breakpoints';

export const BUTTON_WIDTH = {
  mainBig: '65%',
};

export const Button = styled.button<{
  $bgColor?: string;
  $txtColor?: string;
  $brColor?: string;
  $brRadius?: string;
  $brWidth?: string;
  width?: string;
  type?: 'large' | 'small' | 'text';
  $iconSize?: number;
  disabled?: boolean;
}>`
  width: ${({ width }) => width ?? 'auto'};
  background-color: ${({ disabled, $bgColor }) =>
    disabled ? COLORS.secondary : ($bgColor ?? COLORS.accent)};
  color: ${({ disabled, $txtColor }) =>
    disabled ? COLORS.text : ($txtColor ?? COLORS.background)};
  box-sizing: border-box;
  border: ${({ type, disabled, $brColor, $brWidth }) =>
    type === 'text'
      ? 'none'
      : `${$brWidth ?? 1}px solid ${disabled ? COLORS.secondary : ($brColor ?? COLORS.accent)}`};

  border-radius: ${({ $brRadius }) => `${$brRadius ?? 24}px`};

  padding: ${({ type }) => (type === 'text' ? '4px' : type === 'small' ? '6px 20px' : '11px 24px')};

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
    width: ${({ $iconSize }) => `${$iconSize ?? 24}px`};
    height: ${({ $iconSize }) => `${$iconSize ?? 24}px`};
    opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  }

  ${media(BREAKPOINTS.sm)} {
    ${({ width }) =>
      width === BUTTON_WIDTH.mainBig &&
      css`
        width: 75%;
      `}
  }

  ${media(BREAKPOINTS.xs)} {
    ${({ width }) =>
      width === BUTTON_WIDTH.mainBig &&
      css`
        width: 85%;
      `}
  }

  ${media(BREAKPOINTS.xs)} {
    padding: ${({ type }) => (type === 'text' ? '0' : type === 'small' ? '4px 16px' : '8px 16px')};
  }
`;

export const OpenCloseBtn = styled.button<{ $isCollapsed?: boolean }>`
  border: none;
  padding: 2px;
  outline: none;
  background-color: ${COLORS.background};
  border-radius: 50%;
  position: absolute;
  right: -12px;
  top: 68px;
  border-right: 1px solid ${COLORS.boxShadow};
  display: flex;
  align-items: center;
  justify-content: center;
  ${basicShadow};
  z-index: 999;

  transition: transform 280ms cubic-bezier(0.22, 1, 0.36, 1);

  &:hover {
    transform: translateY(-1px);
    ${hoverBoxShadow};
  }

  &:active {
    transform: translateY(-1px) scale(0.99);
  }

  svg {
    flex-shrink: 1;
  }
`;
