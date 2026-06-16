import styled from 'styled-components';
import { useState } from 'react';
import { FAQ_QUESTIONS } from '../assets/shared/data/topic';
import { COLORS } from '../assets/styles/colors';
import { ChevronIcon } from '../assets/images/icons/chevron-icon';
import { SmallText, TextBody } from '../assets/styles/typography';
import { Button } from './button';

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Card = styled.div`
  background: ${COLORS.lighterBg};
  border: 0.5px solid ${COLORS.boxShadow};
  border-radius: 12px;
  overflow: hidden;
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

const QuestionItem = ({ question, isOpen, onToggle }: QuestionItemProps) => (
  <Card>
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
            <TextBody>Відповіді немає.</TextBody>
          </Content>
        )}
      </Inner>
    </Body>
  </Card>
);

export const QuestionsAccordion = () => {
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
        />
      ))}
    </List>
  );
};
