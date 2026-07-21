import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { TextBody } from '../assets/styles/typography';
import { COLORS } from '../assets/styles/colors';
import type { CourseProgressResponse } from '../api/courses/details.types';
import { useTopicDetailsStudent } from '../assets/shared/hooks/useTopicDetailsStudent';

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

export const MobileTopicTree = ({
  course,
  courseTitle,
}: {
  course: CourseProgressResponse;
  courseTitle: string;
}) => {
  const [opened, setOpened] = useState<number | null>(() => course.topics[0]?.topic_id ?? null);
  const { topic, fetchTopic } = useTopicDetailsStudent();

  const toggle = (id: number) => {
    setOpened((prev) => (prev === id ? null : id));
    if (id) {
      void fetchTopic(id);
    }
  };

  useEffect(() => {
    if (course.topics.length > 0) {
      void fetchTopic(course.topics[0].topic_id);
    }
  }, [course.topics, fetchTopic]);

  return (
    <ItemsBlock>
      <RootLabel $label>{courseTitle}</RootLabel>

      {course.topics.length > 0 ? (
        course.topics.map((item) => {
          const isOpen = opened === item.topic_id;

          return (
            <AccItem key={item.topic_id}>
              <AccHeader
                onClick={() => toggle(item.topic_id)}
                aria-expanded={isOpen}
                aria-controls={`acc-body-${item.topic_id}`}
              >
                <AccLabel $medium data-label $active={opened === item.topic_id}>
                  {item.title}
                </AccLabel>

                {/* <AccRight>
                {item.done && <Badge $variant="done">✓ Завершено</Badge>}
                {opened === item.id && !item.done && <Badge $variant="active">Активна</Badge>}
                <Chevron $open={isOpen} aria-hidden="true">
                  ›
                </Chevron>
              </AccRight> */}
              </AccHeader>

              <AccBody $open={isOpen} id={`acc-body-${item.topic_id}`} role="region">
                <AccInner>
                  <SubList>
                    {topic?.passport.outcomes.map((sub) => (
                      <SubItem key={sub}>
                        <SubDot $active={opened === item.topic_id} />
                        <TextBody>{sub}</TextBody>
                      </SubItem>
                    ))}
                  </SubList>
                </AccInner>
              </AccBody>
            </AccItem>
          );
        })
      ) : (
        <TextBody>У цьому курсі немає тем</TextBody>
      )}
    </ItemsBlock>
  );
};

const ItemsBlock = styled.div`
  width: 100%;
  border-top: 0.5px solid ${COLORS.boxShadow};
  margin-top: 16px;
`;
