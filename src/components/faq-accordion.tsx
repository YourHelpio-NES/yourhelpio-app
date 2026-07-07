import styled, { css } from 'styled-components';
import { useState } from 'react';
import { FAQ_QUESTIONS } from '../assets/shared/data/topic';
import { COLORS } from '../assets/styles/colors';
import { ChevronIcon } from '../assets/images/icons/chevron-icon';
import { SmallText, TextBody } from '../assets/styles/typography';
import { Button } from './button';
import Input from './input';
import { InputTypeEnum } from '../assets/shared/constants/input';

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Card = styled.div<{ $isTeacherMode: boolean }>`
  background: ${COLORS.lighterBg};
  border: 0.5px solid ${COLORS.boxShadow};
  border-radius: 12px;
  overflow: hidden;

  ${({ $isTeacherMode }) =>
    $isTeacherMode &&
    css`
      position: relative;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;

        width: 5px;
        height: 100%;

        background: ${COLORS.primary};

        transform: scaleY(1);
        transform-origin: top;

        transition: transform 0.4s ease;
      }

      &:hover::before {
      }
    `}
`;

const Header = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 14px 16px;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;

  &:hover span[data-question] {
    color: rgba(0, 0, 0, 0.9);
  }
`;

const QuestionText = styled(TextBody)`
  color: ${COLORS.text};
  flex: 1;
  transition: color 0.15s;
`;

const Badge = styled(SmallText)<{ $type: string }>`
  padding: 4px 10px;
  border-radius: 20px;
  border: 1px solid ${COLORS.accent};
  color: ${COLORS.accent};
  background: transparent;
  flex-shrink: 0;
`;

const Body = styled.div<{ $open: boolean }>`
  display: grid;
  grid-template-rows: ${({ $open }) => ($open ? '1fr' : '0fr')};
  transition: grid-template-rows 0.3s ease;
`;

const Inner = styled.div`
  overflow: hidden;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  padding: 0 16px 16px;
`;

export interface FaqQuestion {
  id: number;
  question: string;
  type: string;
  topic: string | null;
  answer: string | null;
}

interface QuestionItemProps {
  question: FaqQuestion;
  isOpen: boolean;
  onToggle: () => void;
}

const QuestionItem = ({
  question,
  isOpen,
  onToggle,
  isTeacherMode = false,
}: QuestionItemProps & { isTeacherMode?: boolean }) => {
  const [setAnswer, setSetAnswer] = useState<boolean>(false);
  const [newAnswer, setNewAnswer] = useState<string>('');

  return (
    <Card $isTeacherMode={isTeacherMode && !question.answer}>
      <Header onClick={onToggle} aria-expanded={isOpen} aria-controls={`qa-body-${question.id}`}>
        <ChevronIcon direction={isOpen ? 'down' : 'right'} size={20} />

        <QuestionText $medium data-question>
          {question.question}
        </QuestionText>

        <Badge $type={question.type}>{question.type}</Badge>
      </Header>

      <Body $open={isOpen} id={`qa-body-${question.id}`} role="region">
        <Inner>
          {question.answer ? (
            <Content>
              {question.topic && (
                <Button
                  $bgColor={COLORS.lighterBg}
                  $txtColor={COLORS.secondary}
                  $brWidth={'2'}
                  $brColor={COLORS.secondary}
                  width="auto"
                  type={'small'}
                >
                  <SmallText $medium>{question.topic}</SmallText>
                </Button>
              )}
              {question.answer && <TextBody $color={COLORS.text}>{question.answer}</TextBody>}
            </Content>
          ) : (
            <Content>
              {isTeacherMode ? (
                setAnswer ? (
                  <span className="d-flex flex-column w-100 align-items-end gap-2">
                    <Input
                      value={newAnswer}
                      setValue={setNewAnswer}
                      type={InputTypeEnum.TEXT}
                      placeholder="Відповідь на питання.."
                    />
                    <Button
                      disabled={!newAnswer}
                      $bgColor={COLORS.primary}
                      $brColor={COLORS.primary}
                    >
                      <TextBody>Зберегти відповідь</TextBody>
                    </Button>
                  </span>
                ) : (
                  <Button
                    type="large"
                    $bgColor={'transparent'}
                    $txtColor={COLORS.primary}
                    $brColor={COLORS.primary}
                    $brWidth={'2'}
                    onClick={() => setSetAnswer(true)}
                  >
                    <SmallText $medium>Дати відповідь на питання</SmallText>
                  </Button>
                )
              ) : (
                <TextBody>Відповіді немає.</TextBody>
              )}
            </Content>
          )}
        </Inner>
      </Body>
    </Card>
  );
};

export const QuestionsAccordion = ({ isTeacherMode = false }: { isTeacherMode?: boolean }) => {
  const [opened, setOpened] = useState<number | null>(1);

  const toggle = (id: number) => setOpened((prev) => (prev === id ? null : id));

  return (
    <List>
      {FAQ_QUESTIONS.map((q) => (
        <QuestionItem
          key={q.id}
          question={q}
          isOpen={opened === q.id}
          onToggle={() => toggle(q.id)}
          isTeacherMode={isTeacherMode}
        />
      ))}
    </List>
  );
};
