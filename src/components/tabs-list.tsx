import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { TextBody } from '../assets/styles/typography';
import { COLORS } from '../assets/styles/colors';
import { motion } from 'framer-motion';
import { basicShadow } from './blocks';
import { BREAKPOINTS, media } from '../assets/styles/breakpoints';

export const TabList = styled.div`
  display: flex;
  border-bottom: 2px solid var(--lighter-border);
  flex-grow: 1;
  gap: 4px;
  border-radius: 12px;
  padding: 16px;
  ${basicShadow};

  ${media(BREAKPOINTS.ml)} {
    overflow-x: auto;
    scrollbar-width: none; /* Firefox */
    -webkit-overflow-scrolling: touch;

    &::-webkit-scrollbar {
      display: none; /* Chrome/Safari */
    }
  }

  ${media(BREAKPOINTS.sm)} {
    padding: 10px;
    gap: 6px;
  }
`;

export const StyledTab = styled(NavLink)<{ $color: string }>`
  position: relative;
  padding: 10px 24px;
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 6px;
  border-radius: 12px;
  background: transparent;
  text-decoration: none;
  text-align: center;
  flex-grow: 1;
  transition:
    color 0.3s ease,
    opacity 0.3s ease,
    border 0.3s ease,
    box-shadow 0.2s ease;
  border: 1px solid ${COLORS.placeholder};

  svg {
    flex-shrink: 0;
  }

  &.active {
    border-color: ${COLORS.accent};
    ${TextBody} {
      color: ${({ $color }) => $color};
    }
  }

  &:hover {
    ${basicShadow};
    border-color: ${COLORS.boxShadow};
    opacity: 0.8;
  }

  ${TextBody} {
    max-width: 95%;
    color: ${COLORS.text};
  }

  ${media(BREAKPOINTS.ml)} {
    /* flex-grow: 0; */
    padding: 8px 16px;
    flex-shrink: 0;
    white-space: nowrap;
  }

  /* На мобільному: ховаємо текст лейблу, лишаємо тільки іконку — компактний таб-бар */
  ${media(BREAKPOINTS.sm)} {
    padding: 10px;
    gap: 8px;

    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

export const Underline = styled(motion.div)<{ $color: string }>`
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: ${({ $color }) => $color};
  border-radius: 20px;
`;
