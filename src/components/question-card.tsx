import type { Dispatch, SetStateAction } from 'react';
import type { Question, QuestionStatusEnum } from '../assets/shared/constants/questions';
import { CardTitle, TextBody } from '../assets/styles/typography';
import { ProgressDots } from './progress-dots-question-card';
import Input from './input';
import { InputTypeEnum } from '../assets/shared/constants/input';
import { COLORS } from '../assets/styles/colors';
import { Button } from './button';
import { BasicBlock } from './blocks';

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
}) => (
  <BasicBlock width="65%">
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

    <CardTitle>{question.text}</CardTitle>
    <Input
      type={InputTypeEnum.TEXT}
      value={answer}
      setValue={setAnswer}
      placeholder="Напишіть відповідь тут"
      label=""
    />
    {question.hint && <TextBody $color={COLORS.secondary}>{question.hint}</TextBody>}

    <span className="d-flex align-items-center justify-content-between w-100">
      <Button
        type="large"
        width="auto"
        $bgColor="transparent"
        $brColor={COLORS.secondary}
        $txtColor={COLORS.secondary}
        onClick={onBack}
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
      <Button type="large" width="auto" onClick={onSubmit}>
        <TextBody $medium $color={COLORS.secondary}>
          {isLast ? 'Завершити' : 'Надіслати'}
        </TextBody>
      </Button>
    </span>
  </BasicBlock>
);
