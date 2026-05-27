import styled, { css } from 'styled-components';
import { panelItems } from '../assets/shared/constants/panel';
import { COLORS } from '../assets/styles/colors';
import { TextBody } from '../assets/styles/typography';
import logo from '../assets/images/logo.png';
import smallLogo from '../../public/favicon.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import { BasicBlock } from './blocks';
import { useEffect, useState } from 'react';
import { ArrowIcon } from '../assets/images/icons/arrow-icon';
import { OpenCloseBtn } from './button';
import { CloseIcon } from '../assets/images/icons/close-icon';
import { BREAKPOINTS, media } from '../assets/styles/breakpoints';
import { motion, AnimatePresence } from 'framer-motion';

export default function Panel({
  isMobile,
  isCollapsed,
  setIsCollapsed,
}: {
  isMobile: boolean;
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const location = useLocation();

  const [isCompact, setIsCompact] = useState(() => window.innerWidth <= BREAKPOINTS.lg);
  const isOverlay = (isMobile || isCompact) && !isCollapsed;

  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsCompact(width <= BREAKPOINTS.lg);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isCompact) {
      setIsCollapsed(true);
    }
  }, [isCompact, setIsCollapsed]);

  useEffect(() => {
    localStorage.setItem('collapsed-panel', String(isCollapsed));
  }, [isCollapsed]);

  useEffect(() => {
    if (isOverlay && !isCollapsed) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOverlay, isCollapsed]);

  const togglePanel = () => {
    setIsCollapsed((prev) => !prev);
  };

  const currentLogo = isCollapsed ? smallLogo : logo;

  return (
    <>
      <AnimatePresence>
        {(!isMobile || !isCollapsed) && (
          <motion.div
            initial={isMobile ? { opacity: 0, x: -24 } : false}
            animate={{ opacity: 1, x: 0 }}
            exit={isMobile ? { opacity: 0, x: -24 } : {}}
            transition={{ duration: 0.25 }}
          >
            <PanelWrapper $overlay={isOverlay} $isCollapsed={isCollapsed}>
              <PanelStyle $isCollapsed={isCollapsed}>
                <img src={currentLogo} alt="logo" />

                <BasicBlock $gap={2}>
                  {Object.entries(panelItems).map(([key, item]) => {
                    const isActive = location.pathname.includes(key);

                    return (
                      <PanelItem
                        key={key}
                        $active={isActive}
                        $isCollapsed={isCollapsed}
                        onClick={() => navigate(`/student/${key}`)}
                      >
                        {item.icon({
                          color: isActive ? COLORS.background : COLORS.text,
                          size: 24,
                        })}

                        {!isCollapsed && <TextBody $medium>{item.name}</TextBody>}
                      </PanelItem>
                    );
                  })}
                </BasicBlock>
              </PanelStyle>

              <OpenCloseBtn $isCollapsed={isCollapsed} onClick={togglePanel}>
                {isCollapsed ? <ArrowIcon direction="right" size={20} /> : <CloseIcon size={20} />}
              </OpenCloseBtn>
            </PanelWrapper>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence mode="popLayout">
        {isOverlay && (
          <Backdrop
            onClick={togglePanel}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>
    </>
  );
}

const PanelWrapper = styled.div<{ $overlay?: boolean; $isCollapsed?: boolean }>`
  position: ${({ $overlay }) => ($overlay ? 'fixed' : 'sticky')};
  top: 0;
  left: 0;

  height: 100vh;

  display: flex;
  z-index: ${({ $overlay }) => ($overlay ? 1000 : 1)};

  transition: all 0.25s ease;
`;

const PanelStyle = styled(BasicBlock)<{
  $isCollapsed: boolean;
  $overlay?: boolean;
}>`
  height: 100vh;
  width: ${({ $isCollapsed, $overlay }) => ($overlay ? '15rem' : $isCollapsed ? '88px' : '15rem')};
  padding: 32px 12px;
  gap: 24px;

  background-color: ${COLORS.background};
  box-shadow: 1px 1px 4px ${COLORS.boxShadow};
  overflow: hidden;

  transition:
    width 0.2s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.2s cubic-bezier(0.22, 1, 0.36, 1);

  img {
    object-fit: contain;
    ${({ $isCollapsed }) =>
      $isCollapsed &&
      css`
        height: 32px;
      `}

    width: auto;
    transition: all 0.2s ease;
  }

  ${BasicBlock} {
    height: 100%;
    width: 100%;
  }

  ${media(BREAKPOINTS.md)} {
    width: ${({ $isCollapsed }) => ($isCollapsed ? '80px' : '15rem')};
    padding: 32px 10px;

    img {
      height: 32px;
    }
  }
  ${media(BREAKPOINTS.xs)} {
    width: ${({ $isCollapsed }) => ($isCollapsed ? '80px' : '16rem')};

    img {
      height: 32px;
      width: fit-content;
    }
  }
`;

const PanelItem = styled.div<{ $active?: boolean; $isCollapsed?: boolean }>`
  padding: 14px 20px;
  width: 100%;
  display: flex;
  gap: 12px;
  background-color: transparent;
  align-items: center;
  justify-content: ${({ $isCollapsed }) => ($isCollapsed ? 'center' : 'flex-start')};
  border-radius: 12px;
  transition: background-color 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);

  &:last-child {
    margin-top: auto;
  }

  svg {
    width: 24px;
    height: 24px;
    flex-shrink: 1;
  }

  ${({ $active }) =>
    $active &&
    css`
      box-shadow: 0 1px 3px 0px ${COLORS.boxShadow};
      background-color: ${COLORS.accent};
      ${TextBody} {
        color: ${COLORS.background};
      }

      &:hover {
        opacity: 0.8;
      }
    `}

  &:hover {
    box-shadow: 0 1px 3px 0px ${COLORS.boxShadow};
    background-color: ${({ $active }) => ($active ? COLORS.accent : COLORS.lighterBg)};
    cursor: pointer;
    ${TextBody} {
      color: ${({ $active }) => ($active ? COLORS.background : COLORS.text)};
    }
  }

  ${media(BREAKPOINTS.md)} {
    padding: 12px 16px;

    svg {
      width: 22px;
      height: 22px;
      flex-shrink: 1;
    }
  }
`;

const Backdrop = styled(motion.div)`
  position: fixed;
  inset: 0;

  background: ${COLORS.boxShadow};

  z-index: 999;

  backdrop-filter: blur(1px);
  background: rgba(0, 0, 0, 0.18);
`;
