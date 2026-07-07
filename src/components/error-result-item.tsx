import { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { TextBody } from '../assets/styles/typography';
import { FileIcon } from '../assets/images/icons/file-icon';
import type { QuizResultError } from '../assets/shared/constants/session';
import { Button } from './button';
import { COLORS } from '../assets/styles/colors';
import { ArrowIcon } from '../assets/images/icons/arrow-icon';
import { basicShadow } from './blocks';
import { BREAKPOINTS, media } from '../assets/styles/breakpoints';

export default function ErrorItem(error: QuizResultError) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <ErrorItemWrapper $open={open}>
      <TextBody $medium>
        {error.questionId}. {error.questionText}
      </TextBody>
      <Button type="text" $txtColor={COLORS.secondaryDark} $bgColor={'transparent'}>
        <ArrowIcon direction="right" color={COLORS.secondaryDark} />
        <TextBody>{error.statusText}</TextBody>
      </Button>

      <Button
        $bgColor={COLORS.secondary}
        $txtColor={COLORS.background}
        $brColor={COLORS.secondary}
        onClick={() => setOpen((prev) => !prev)}
      >
        <TextBody $label>{open ? 'Приховати пояснення' : 'Переглянути пояснення'}</TextBody>
      </Button>

      <ExplanationWrapper $open={open}>
        <ExplanationInner>
          <ExplanationCard $open={open}>
            <ExplanationHeader>
              {/* іконка — підключи свою або використай будь-яку бібліотеку */}
              <FileIcon />
              <TextBody $medium>Пояснення</TextBody>
            </ExplanationHeader>
            <ExplanationBody>
              <TextBody $label>{error.explanation?.questionText}</TextBody>
              <TextBody>{error.explanation?.body}</TextBody>
            </ExplanationBody>
          </ExplanationCard>
        </ExplanationInner>
      </ExplanationWrapper>
    </ErrorItemWrapper>
  );
}

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-6px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const ErrorItemWrapper = styled.div<{ $open: boolean }>`
  padding-bottom: ${({ $open }) => ($open ? '12px' : '0')};
  border-bottom: 1px solid ${({ $open }) => ($open ? COLORS.primary : COLORS.primaryShadow)};
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;

  &:last-child {
    border-bottom: none;
  }

  ${media(BREAKPOINTS.ml)} {
    max-width: 48%;
    border-bottom: none;
  }

  @media (max-width: 815px) {
    max-width: 100%;
    border-bottom: 1px solid ${({ $open }) => ($open ? COLORS.primary : COLORS.primaryShadow)};
  }

  ${media(BREAKPOINTS.sm)} {
    gap: 8px;
  }
`;

const ExplanationWrapper = styled.div<{ $open: boolean }>`
  display: grid;
  grid-template-rows: ${({ $open }) => ($open ? '1fr' : '0fr')};
  transition: grid-template-rows 0.35s ease;
  transition:
    grid-template-rows 0.35s ease,
    margin-top 0.35s ease;
`;

const ExplanationInner = styled.div`
  overflow: hidden;
`;

const ExplanationCard = styled.div<{ $open: boolean }>`
  border: 1.5px solid ${COLORS.primary};
  padding: 12px;
  border-radius: 12px;
  overflow: hidden;
  background: ${COLORS.lighterBg};

  ${({ $open }) =>
    $open &&
    css`
      animation: ${fadeIn} 0.3s ease both;
    `}
`;

const ExplanationHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 12px;
  padding-top: 8px;
  font-size: 14px;
  font-weight: 500;
  color: ${COLORS.text};
`;

const ExplanationBody = styled.div`
  background: ${COLORS.background};
  ${basicShadow};
  padding: 14px 16px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
