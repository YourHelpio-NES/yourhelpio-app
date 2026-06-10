import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { TextBody } from '../assets/styles/typography';
import { COLORS } from '../assets/styles/colors';

export const TOPICS = [
  {
    id: 0,
    label: ['Основи', 'програмування'],
    done: true,
    x: 56,
    subtopics: ['Розуміти поняття алгоритму', 'Аналізувати прості задачі', 'Записувати псевдокод'],
  },
  {
    id: 1,
    label: ['Змінні'],
    done: true,
    x: 136,
    subtopics: ['Оголошувати змінні', 'Присвоювати значення', 'Розрізняти типи змінних'],
  },
  {
    id: 2,
    label: ['Типи даних'],
    done: false,
    x: 220,
    subtopics: [
      'Пояснювати, що таке тип даних',
      'Розрізняти основні типи даних',
      'Визначати тип даних змінної',
      'Використовувати різні типи у прикладах',
    ],
  },
  {
    id: 3,
    label: ['Умови'],
    done: false,
    x: 315,
    subtopics: ['Записувати умовні вирази', 'Використовувати if/else', 'Будувати блок-схеми умов'],
  },
  {
    id: 4,
    label: ['Цикли'],
    done: false,
    x: 397,
    subtopics: [
      'Розуміти принцип повторення',
      'Використовувати for/while',
      'Уникати нескінченних циклів',
    ],
  },
  {
    id: 5,
    label: ['Сортування'],
    done: false,
    x: 478,
    subtopics: [
      'Пояснювати алгоритми сортування',
      'Порівнювати bubble та selection sort',
      'Оцінювати складність',
    ],
  },
  {
    id: 6,
    label: ['ООП'],
    done: false,
    x: 560,
    subtopics: [
      "Розуміти класи та об'єкти",
      'Застосовувати інкапсуляцію',
      'Реалізовувати наслідування',
    ],
  },
  {
    id: 7,
    label: ['Функції'],
    done: false,
    x: 632,
    subtopics: ['Оголошувати функції', 'Передавати аргументи', 'Повертати значення'],
  },
];

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

const Root = styled.div`
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  box-sizing: border-box;
  -webkit-overflow-scrolling: touch;
`;

const Inner = styled.div`
  min-width: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  padding-bottom: 24px;
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

const TopicRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
  flex-wrap: nowrap;

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
  ${TextBody} {
    overflow-wrap: break-word;
    text-align: center;
  }
  transition: all 0.2s ease;
  text-align: center;
  z-index: 9;
  flex: 0 0 150px;
  max-width: 150px;

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
  animation-delay: 0ms;

  @media (max-width: 600px) {
    padding: 6px 12px;
  }
`;

const SubtopicArea = styled.div`
  width: 100%;
  margin-top: 0;
`;

const SubtopicGrid = styled.div`
  display: flex;
  justify-content: flex-start;
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
  max-width: 25%;
  min-width: 20%;
  flex: 0 1 auto;
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
  svgRef: React.RefObject<SVGSVGElement | null>;
  rootRef: React.RefObject<HTMLDivElement | null>;
}

export default function TopicTree() {
  const [activeId, setActiveId] = useState<number | null>(2);
  const rootRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const subtopicRefs = useRef<(HTMLDivElement | null)[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeTopic = activeId !== null ? TOPICS[activeId] : null;

  const handleChipClick = (id: number) => {
    setActiveId((prev) => (prev === id ? null : id));
    subtopicRefs.current = [];
  };

  const [containerWidth, setContainerWidth] = useState(0);

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
      <Inner ref={containerRef} style={{ position: 'relative' }}>
        <RootNode ref={rootRef} $medium>
          Алгоритми проєктування
        </RootNode>

        <div style={{ height: 40 }} />

        <TopicRow>
          {TOPICS.map((t) => (
            <TopicChip
              key={t.id}
              ref={(el) => {
                chipRefs.current[t.id] = el;
              }}
              $done={t.done}
              $active={activeId === t.id}
              onClick={() => handleChipClick(t.id)}
              aria-pressed={activeId === t.id}
            >
              <TextBody>{t.label.join(' ')}</TextBody>
              {/* {t.done && <DoneIcon aria-label="завершено">✓</DoneIcon>} */}
            </TopicChip>
          ))}
        </TopicRow>

        {/* Subtopics */}
        {activeTopic && (
          <SubtopicArea>
            <div style={{ height: 40 }} />
            <SubtopicGrid>
              {activeTopic.subtopics.map((s, i) => (
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
            activeId={activeId}
            chipRefs={chipRefs}
            subtopicRefs={subtopicRefs}
            svgRef={svgRef}
            rootRef={rootRef}
          />
        </svg>
      </Inner>
    </Root>
  );
}

function ConnectorsRenderer({
  activeId,
  chipRefs,
  subtopicRefs,
  svgRef,
  rootRef,
}: ConnectorsProps) {
  const [paths, setPaths] = useState<{ d: string; delay: number }[]>([]);
  const [rootPaths, setRootPaths] = useState<{ d: string; delay: number }[]>([]);

  const [renderKey, setRenderKey] = useState(0);

  useEffect(() => {
    if (!svgRef.current || !rootRef.current) return;

    const svgRect = svgRef.current.getBoundingClientRect();

    const rootRect = rootRef.current.getBoundingClientRect();

    const rootCenterX = rootRect.left + rootRect.width / 2 - svgRect.left;

    const rootBottom = rootRect.bottom - svgRect.top;

    const paths = chipRefs.current.filter(Boolean).map((chip, index) => {
      const chipRect = chip!.getBoundingClientRect();

      const chipCenterX = chipRect.left + chipRect.width / 2 - svgRect.left;

      const chipTop = chipRect.top - svgRect.top;

      const midY = rootBottom + (chipTop - rootBottom) * 0.5;

      return {
        d: `
          M ${rootCenterX} ${rootBottom}
          C
          ${rootCenterX} ${midY},
          ${chipCenterX} ${midY},
          ${chipCenterX} ${chipTop}
        `,
        delay: index * 40,
      };
    });

    setRootPaths(paths);
  }, [renderKey, chipRefs, rootRef, svgRef]);

  useEffect(() => {
    if (activeId === null || !svgRef.current) {
      setPaths([]);
      return;
    }

    const frame = requestAnimationFrame(() => {
      if (!svgRef.current) return;
      const svgRect = svgRef.current.getBoundingClientRect();
      const chip = chipRefs.current[activeId];

      if (!chip) return;
      const chipRect = chip.getBoundingClientRect();
      const cx = chipRect.left + chipRect.width / 2 - svgRect.left;
      const cy = chipRect.bottom - svgRect.top;
      const newPaths: { d: string; delay: number }[] = [];

      subtopicRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();

        const tx = r.left + r.width / 2 - svgRect.left;
        const ty = r.top - svgRect.top;
        const midY = cy + (ty - cy) * 0.45;
        newPaths.push({
          d: `M ${cx} ${cy} C ${cx} ${midY}, ${tx} ${midY}, ${tx} ${ty}`,
          delay: i * 50,
        });
      });
      setPaths(newPaths);
    });

    const handleResize = () => setRenderKey((v) => v + 1);

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', handleResize);
    };
  }, [activeId, chipRefs, subtopicRefs, svgRef, renderKey, rootRef]);

  return (
    <>
      {rootPaths.map(({ d, delay }, i) => (
        <AnimatedPath
          key={`${activeId}-${d}-${i}`}
          d={d}
          fill="none"
          stroke={COLORS.accent}
          strokeWidth="1.5"
          pathLength="1"
          $delay={delay}
          opacity="0.5"
        />
      ))}

      {paths.map(({ d, delay }, i) => (
        <AnimatedPath
          key={`${activeId}-${i}`}
          d={d}
          fill="none"
          stroke={COLORS.accent}
          strokeWidth="1.5"
          pathLength="1"
          $delay={delay}
          opacity="0.5"
        />
      ))}
    </>
  );
}
