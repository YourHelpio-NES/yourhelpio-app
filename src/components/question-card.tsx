import { type Dispatch, type SetStateAction } from 'react';
import type { Question, QuestionStatusEnum } from '../assets/shared/constants/questions';
import { CardTitle, TextBody } from '../assets/styles/typography';
import { ProgressDots } from './progress-dots-question-card';
import Input from './input';
import { InputTypeEnum } from '../assets/shared/constants/input';
import { COLORS } from '../assets/styles/colors';
import { Button } from './button';
import { BasicBlock, basicShadow } from './blocks';
import styled from 'styled-components';
import ModalWindow from './modal-window';
import { BREAKPOINTS, media } from '../assets/styles/breakpoints';

export const QuestionCard = ({
  question,
  currentIndex,
  setCurrentIndex,
  totalQuestions,
  answer,
  setAnswer,
  statuses,
  onSubmit,
  onSkip,
  onBack,
  isLast,
  pendingAction,
  setPendingAction,
  confirmLastAction,
}: {
  question: Question;
  currentIndex: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
  totalQuestions: number;
  answer: string;
  setAnswer: Dispatch<SetStateAction<string>>;
  statuses: QuestionStatusEnum[];
  onSubmit: () => void;
  onSkip: () => void;
  onBack: () => void;
  isLast: boolean;
  pendingAction: 'submit' | 'skip' | null;
  setPendingAction: Dispatch<SetStateAction<'submit' | 'skip' | null>>;
  confirmLastAction: () => void;
}) => {
  return (
    <>
      <QuestionCardBlock width="65%" $gap={24}>
        <span className="d-flex flex-column gap-2">
          <TextBody $medium>
            Питання {currentIndex + 1} / {totalQuestions}
          </TextBody>
          <ProgressDots
            statuses={statuses}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
        </span>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <span className="d-flex flex-column gap-2">
            <CardTitle>{question.text}</CardTitle>
            <Input
              type={InputTypeEnum.TEXT}
              value={answer}
              setValue={setAnswer}
              placeholder="Напишіть відповідь тут"
              label=""
            />
            {question.hint && <TextBody $color={COLORS.secondary}>{question.hint}</TextBody>}
          </span>
        </form>
        <span className="d-flex align-items-center gap-4 w-100">
          <Button
            type="large"
            width="auto"
            $bgColor="transparent"
            $brColor={COLORS.primary}
            $txtColor={COLORS.primary}
            $brWidth={'2'}
            onClick={onBack}
            disabled={currentIndex <= 0}
          >
            <TextBody $medium>Назад</TextBody>
          </Button>
          <Button
            type="text"
            width="auto"
            $txtColor={COLORS.text}
            $bgColor="transparent"
            onClick={onSkip}
          >
            <TextBody $medium>Не знаю відповіді</TextBody>
          </Button>
          <Button className="ms-auto" type="large" width="auto" onClick={onSubmit}>
            <TextBody $medium $color={COLORS.secondary}>
              {isLast ? 'Завершити' : 'Надіслати'}
            </TextBody>
          </Button>
        </span>
      </QuestionCardBlock>
      <ModalWindow
        isOpen={!!pendingAction}
        onClose={() => setPendingAction(null)}
        title="Завершити тестування?"
        size="md"
        footer={
          <>
            <Button
              type="small"
              width="auto"
              $bgColor="transparent"
              $brColor={COLORS.secondary}
              $txtColor={COLORS.secondary}
              $brWidth="2"
              onClick={() => setPendingAction(null)}
            >
              <TextBody $medium>Скасувати</TextBody>
            </Button>

            <Button type="small" width="auto" onClick={confirmLastAction}>
              <TextBody $medium $color={COLORS.secondary}>
                Продовжити
              </TextBody>
            </Button>
          </>
        }
      >
        {' '}
        <TextBody>Цю дію не можна скасувати.</TextBody>{' '}
      </ModalWindow>
    </>
  );
};

export const QuestionCardBlock = styled(BasicBlock)`
  border: 1px solid ${COLORS.secondary};
  border-radius: 16px;
  ${basicShadow};
  padding: 32px;

  ${CardTitle} {
    color: ${COLORS.text};
  }

  ${media(BREAKPOINTS.sm)} {
    padding: 24px;
  }

  ${media(BREAKPOINTS.xs)} {
    padding: 16px;
  }
`;
