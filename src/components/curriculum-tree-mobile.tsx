import { useState } from 'react';
import { TOPICS } from './curriculum-tree';
import styled from 'styled-components';
import { SmallText, TextBody } from '../assets/styles/typography';
import { COLORS } from '../assets/styles/colors';

const RootLabel = styled(TextBody)`
  color: ${COLORS.text};
  margin: 0 0 4px;
  padding: 16px 0;
  border-bottom: 0.5px solid ${COLORS.boxShadow};
`;

const AccItem = styled.div`
  border-bottom: 0.5px solid ${COLORS.boxShadow};
`;

const AccHeader = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 0;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;

  &:hover ${TextBody}[data-label] {
    color: ${COLORS.secondary};
  }
`;

const AccLabel = styled(TextBody)<{ $done?: boolean; $active?: boolean }>`
  flex: 1;
  color: ${({ $done, $active }) =>
    $active ? COLORS.accent : $done ? COLORS.text : COLORS.secondaryDark};
  transition: color 0.2s;
`;

const AccRight = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
`;

const Badge = styled(SmallText)<{ $variant: 'done' | 'active' }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: 20px;
  background: ${({ $variant }) => ($variant === 'done' ? '#EAF3DE' : '#FAECE7')};
  color: ${({ $variant }) => ($variant === 'done' ? COLORS.status.success : COLORS.accent)};
`;

const Chevron = styled.span<{ $open: boolean }>`
  display: inline-flex;
  font-size: 22px;
  color: ${COLORS.secondary};
  transition: transform 0.25s ease;
  transform: ${({ $open }) => ($open ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

const AccBody = styled.div<{ $open: boolean }>`
  display: grid;
  grid-template-rows: ${({ $open }) => ($open ? '1fr' : '0fr')};
  transition: grid-template-rows 0.3s ease;
`;

const AccInner = styled.div`
  overflow: hidden;
`;

const SubList = styled.ul`
  margin: 0;
  padding: 2px 0 16px;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const SubItem = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  border-radius: 8px;
  background: ${COLORS.background};
  border: 0.5px solid ${COLORS.boxShadow};
  ${TextBody} {
    color: ${COLORS.text};
  }
`;

const SubDot = styled.span<{ $active?: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ $active }) => ($active ? COLORS.accent : COLORS.secondary)};
  flex-shrink: 0;
`;

export const MobileTopicTree = () => {
  const [opened, setOpened] = useState<number | null>(2);

  const toggle = (id: number) => setOpened((prev) => (prev === id ? null : id));

  return (
    <ItemsBlock>
      <RootLabel $label>Алгоритми проєктування</RootLabel>

      {TOPICS.map((topic) => {
        const label = topic.label.join(' ');
        const isOpen = opened === topic.id;

        return (
          <AccItem key={topic.id}>
            <AccHeader
              onClick={() => toggle(topic.id)}
              aria-expanded={isOpen}
              aria-controls={`acc-body-${topic.id}`}
            >
              <AccLabel $medium data-label $done={topic.done} $active={opened === topic.id}>
                {label}
              </AccLabel>

              <AccRight>
                {topic.done && <Badge $variant="done">✓ Завершено</Badge>}
                {opened === topic.id && !topic.done && <Badge $variant="active">Активна</Badge>}
                <Chevron $open={isOpen} aria-hidden="true">
                  ›
                </Chevron>
              </AccRight>
            </AccHeader>

            <AccBody $open={isOpen} id={`acc-body-${topic.id}`} role="region">
              <AccInner>
                <SubList>
                  {topic.subtopics.map((sub) => (
                    <SubItem key={sub}>
                      <SubDot $active={opened === topic.id && !topic.done} />
                      <TextBody>{sub}</TextBody>
                    </SubItem>
                  ))}
                </SubList>
              </AccInner>
            </AccBody>
          </AccItem>
        );
      })}
    </ItemsBlock>
  );
};

const ItemsBlock = styled.div`
  width: 100%;
  border-top: 0.5px solid ${COLORS.boxShadow};
  margin-top: 16px;
`;
