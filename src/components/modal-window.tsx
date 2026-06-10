import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import styled, { keyframes } from 'styled-components';
import { CloseIcon } from '../assets/images/icons/close-icon';
import { TextBody } from '../assets/styles/typography';
import { COLORS } from '../assets/styles/colors';
import { basicShadow } from './blocks';

export default function ModalWindow({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer: React.ReactNode;
  size: 'sm' | 'md' | 'lg';
}) {
  const overlayRef = useRef(null);
  const [isVisible, setIsVisible] = useState<boolean>(isOpen);

  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsVisible(true);
    } else {
      const timeout = setTimeout(() => setIsVisible(false), 200);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) onClose();
  };

  if (!isVisible) return null;

  const widths = { sm: 360, md: 480, lg: 640 };

  return createPortal(
    <ModalWindowStyle $isVisible={isOpen} ref={overlayRef} onClick={handleOverlayClick}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="box"
        style={{ maxWidth: widths[size] }}
      >
        <div className="header">
          <TextBody $label id="modal-title" className="title">
            {title}
          </TextBody>
          <button onClick={onClose} className="close-btn" aria-label="Закрити">
            <CloseIcon />
          </button>
        </div>

        <div className="body">{children}</div>

        {footer && <div className="footer">{footer}</div>}
      </div>
    </ModalWindowStyle>,
    document.body
  );
}

const ModalWindowStyle = styled.div<{ $isVisible: boolean }>`
  position: fixed;
  inset: 0;
  background: ${COLORS.overlay};
  backdrop-filter: blur(2px);

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  z-index: 1000;

  animation: ${({ $isVisible }) => ($isVisible ? fadeIn : fadeOut)} 200ms ease forwards;

  .box {
    background: ${COLORS.lighterBg};
    border-radius: 12px;
    border: 1px solid ${COLORS.boxShadow};
    ${basicShadow};
    width: 100%;
    overflow: hidden;
    padding: 28px;
    display: flex;
    flex-direction: column;
    gap: 16px;

    animation: ${({ $isVisible }) => ($isVisible ? scaleIn : scaleOut)} 200ms ease forwards;
  }
  .header {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .title {
    /* font-size: 16px;
    font-weight: 500;
    margin: 0; */
  }

  .close-btn {
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 4px;
    border-radius: 6px;
    line-height: 1;
    margin-left: auto;
  }

  .body {
    color: ${COLORS.text};
    text-align: center;
  }

  .footer {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    padding-top: 12px;

    button {
      flex: 0 1 50%;
    }
  }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const scaleIn = keyframes`
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`;

const scaleOut = keyframes`
  from { transform: scale(1); opacity: 1; }
  to { transform: scale(0.95); opacity: 0; }
`;
