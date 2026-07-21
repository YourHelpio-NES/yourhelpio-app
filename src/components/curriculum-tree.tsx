import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { TextBody } from '../assets/styles/typography';
import { COLORS } from '../assets/styles/colors';
import type { CourseProgressResponse } from '../api/courses/details.types';
import { useTopicDetailsStudent } from '../assets/shared/hooks/useTopicDetailsStudent';

const fadeSlideUp = keyframes`
  to   { opacity: 1; transform: translateY(0); }
`;

const drawLine = keyframes`
  from { stroke-dashoffset: 1; }
  to   { stroke-dashoffset: 0; }
`;

const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(234, 88, 12, 0.25); }
  50%       { box-shadow: 0 0 0 6px rgba(234, 88, 12, 0); }
`;

// Скрол більше не критичний для розрахунку, тож ховаємо горизонтальний
// скрол взагалі і даємо чипам переноситись — це і є "адаптивність" під різну к-сть тем
const Root = styled.div`
  width: 100%;
  box-sizing: border-box;
`;

const Inner = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  padding-bottom: 24px;
  position: relative; /* спільний referential predok для offsetLeft/offsetTop */
`;

const RootNode = styled(TextBody)`
  padding: 12px 20px;
  border: 2px solid ${COLORS.secondary};
  border-radius: 999px;
  font-size: 15px;
  font-weight: 500;
  color: ${COLORS.text};
  background: ${COLORS.lighterBg};
  animation: ${fadeSlideUp} 0.4s ease both;
  white-space: nowrap;
`;

const AnimatedPath = styled.path<{ $delay?: number }>`
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  animation: ${drawLine} 0.5s ease forwards;
  animation-delay: ${({ $delay = 0 }) => $delay}ms;
`;

// wrap замість nowrap + center — довільна к-сть тем лягає симетрично в кілька рядків
const TopicRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 12px 10px;
  width: 100%;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    gap: 8px;
  }
`;

const TopicChip = styled.button<{
  $done: boolean;
  $active: boolean;
}>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;
  z-index: 9;

  /* динамічна ширина замість фіксованих 200px — довгі назви більше не ламають рядок */
  flex: 0 1 auto;
  min-width: 120px;
  max-width: 240px;

  ${TextBody} {
    overflow-wrap: break-word;
    text-align: center;
    white-space: normal; /* дозволяємо перенос на 2 рядки для довгих назв */
  }

  ${({ $active, $done }) =>
    $active
      ? css`
          border: 2px solid ${COLORS.accent};
          ${TextBody} {
            color: ${COLORS.accent};
          }
          background: ${COLORS.lighterBg};
          animation: ${pulse} 2s ease infinite;
        `
      : $done
        ? css`
            border: 1.5px solid #d1d5db;
            ${TextBody} {
              color: ${COLORS.secondary};
            }
            background: ${COLORS.lighterBg};
          `
        : css`
            border: 1.5px solid #d1d5db;
            ${TextBody} {
              color: ${COLORS.text};
            }
            background: ${COLORS.lighterBg};
            &:hover {
              border-color: ${COLORS.secondary};
              background: ${COLORS.background};
            }
          `}

  animation: ${fadeSlideUp} 0.45s ease both;

  @media (max-width: 600px) {
    padding: 6px 12px;
    min-width: 100px;
  }
`;

const SubtopicArea = styled.div`
  width: 100%;
  margin-top: 0;
`;

const SubtopicGrid = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 12px;
  width: 100%;
  flex-wrap: wrap;
  padding: 0;
`;

const SubtopicCard = styled(TextBody)<{ $index: number }>`
  background: ${COLORS.lighterBg};
  border: 1.5px solid ${COLORS.secondary};
  border-radius: 16px;
  padding: 12px 16px;
  color: ${COLORS.secondaryDark};
  max-width: 280px;
  min-width: 180px;
  flex: 1 1 220px;
  z-index: 1;

  animation: ${fadeSlideUp} 0.4s ease both;
  animation-delay: ${({ $index }) => $index * 60}ms;

  @media (max-width: 600px) {
    max-width: 100%;
    flex: 1 1 130px;
  }
`;

interface ConnectorsProps {
  activeId: number | null;
  chipRefs: React.MutableRefObject<(HTMLButtonElement | null)[]>;
  subtopicRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  rootRef: React.RefObject<HTMLDivElement | null>;
  outcomesKey: number;
}

export default function TopicTree({
  course,
  courseTitle,
}: {
  course: CourseProgressResponse;
  courseTitle: string;
}) {
  const [activeId, setActiveId] = useState<number | null>();

  const rootRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const subtopicRefs = useRef<(HTMLDivElement | null)[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeTopic = activeId !== null ? course.topics.find((x) => x.topic_id === activeId) : null;
  const { topic, fetchTopic } = useTopicDetailsStudent();

  const handleChipClick = (id: number) => {
    setActiveId((prev) => (prev === id ? null : id));
    subtopicRefs.current = [];
  };

  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (activeId) {
      void fetchTopic(activeId);
    }
  }, [activeId, fetchTopic]);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [activeId, containerWidth]);

  return (
    <Root>
      {course.topics.length > 0 ? (
        <Inner ref={containerRef} style={{ position: 'relative' }}>
          <RootNode ref={rootRef} $medium>
            {courseTitle}
          </RootNode>

          <div style={{ height: 40 }} />

          <TopicRow>
            {course.topics.map((t) => (
              <TopicChip
                key={t.topic_id}
                ref={(el) => {
                  chipRefs.current[t.topic_id] = el;
                }}
                $done={t.in_remediation}
                $active={activeId === t.topic_id}
                onClick={() => handleChipClick(t.topic_id)}
                aria-pressed={activeId === t.topic_id}
                title={t.title}
              >
                <TextBody>{t.title}</TextBody>
              </TopicChip>
            ))}
          </TopicRow>

          {/* Subtopics */}
          {activeTopic && topic?.passport.outcomes && (
            <SubtopicArea>
              <div style={{ height: 60 }} />
              <SubtopicGrid>
                {topic.passport.outcomes.map((s, i) => (
                  <SubtopicCard
                    key={i}
                    $index={i}
                    ref={(el) => {
                      subtopicRefs.current[i] = el;
                    }}
                  >
                    {s}
                  </SubtopicCard>
                ))}
              </SubtopicGrid>
            </SubtopicArea>
          )}

          <svg
            ref={svgRef}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              overflow: 'visible',
            }}
          >
            <ConnectorsRenderer
              activeId={activeId ?? null}
              chipRefs={chipRefs}
              subtopicRefs={subtopicRefs}
              containerRef={containerRef}
              rootRef={rootRef}
              outcomesKey={topic?.passport.outcomes?.length ?? 0}
            />
          </svg>
        </Inner>
      ) : (
        <TextBody>У цьому курсі немає тем</TextBody>
      )}
    </Root>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getRelativeRect(el: HTMLElement, _container: HTMLElement) {
  return {
    left: el.offsetLeft,
    top: el.offsetTop,
    width: el.offsetWidth,
    height: el.offsetHeight,
  };
}

function ConnectorsRenderer({
  activeId,
  chipRefs,
  subtopicRefs,
  containerRef,
  rootRef,
  outcomesKey,
}: ConnectorsProps) {
  const [paths, setPaths] = useState<{ d: string; delay: number }[]>([]);
  const [rootPaths, setRootPaths] = useState<{ d: string; delay: number }[]>([]);

  const visiblePaths = activeId === null ? [] : paths;

  const recomputeRootPaths = () => {
    if (!containerRef.current || !rootRef.current) return;

    const root = getRelativeRect(rootRef.current, containerRef.current);
    const rootCenterX = root.left + root.width / 2;
    const rootBottom = root.top + root.height;

    const newPaths = chipRefs.current
      .filter((chip): chip is HTMLButtonElement => Boolean(chip))
      .map((chip, index) => {
        const chipRect = getRelativeRect(chip, containerRef.current!);
        const chipCenterX = chipRect.left + chipRect.width / 2;
        const chipTop = chipRect.top;
        const midY = rootBottom + (chipTop - rootBottom) * 0.5;

        return {
          d: `M ${rootCenterX} ${rootBottom} C ${rootCenterX} ${midY}, ${chipCenterX} ${midY}, ${chipCenterX} ${chipTop}`,
          delay: index * 40,
        };
      });

    setRootPaths(newPaths);
  };

  const recomputeSubtopicPaths = () => {
    if (activeId === null || !containerRef.current) {
      setPaths([]);
      return;
    }
    const chip = chipRefs.current[activeId];
    if (!chip) return;

    const chipRect = getRelativeRect(chip, containerRef.current);
    const cx = chipRect.left + chipRect.width / 2;
    const cy = chipRect.top + chipRect.height;

    const newPaths: { d: string; delay: number }[] = [];
    subtopicRefs.current.forEach((el, i) => {
      if (!el) return;
      const r = getRelativeRect(el, containerRef.current!);
      const tx = r.left + r.width / 2;
      const ty = r.top;
      const midY = cy + (ty - cy) * 0.45;
      newPaths.push({
        d: `M ${cx} ${cy} C ${cx} ${midY}, ${tx} ${midY}, ${tx} ${ty}`,
        delay: i * 50,
      });
    });
    setPaths(newPaths);
  };

  useEffect(() => {
    if (!containerRef.current) return;
    recomputeRootPaths();

    const observer = new ResizeObserver(() => recomputeRootPaths());
    observer.observe(containerRef.current);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chipRefs.current.length]);

  useEffect(() => {
    if (activeId === null) {
      return;
    }

    const frame1 = requestAnimationFrame(() => {
      const frame2 = requestAnimationFrame(() => {
        recomputeSubtopicPaths();
      });

      return () => cancelAnimationFrame(frame2);
    });

    return () => {
      cancelAnimationFrame(frame1);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId, outcomesKey]);

  return (
    <>
      {rootPaths.map(({ d, delay }, i) => (
        <AnimatedPath
          key={`root-${i}`}
          d={d}
          fill="none"
          stroke={COLORS.accent}
          strokeWidth="2"
          pathLength="1"
          $delay={delay}
          opacity="0.5"
        />
      ))}

      {visiblePaths.map(({ d, delay }, i) => (
        <AnimatedPath
          key={`sub-${activeId}-${i}`}
          d={d}
          fill="none"
          stroke={COLORS.accent}
          strokeWidth="2.7"
          pathLength="1"
          $delay={delay}
          opacity="0.7"
        />
      ))}
    </>
  );
}
