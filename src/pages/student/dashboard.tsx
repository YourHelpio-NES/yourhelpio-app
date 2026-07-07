import AppLayout from '../../components/widgets/app/layout';
import { SimpleTable } from '../../components/table';
import { CardTitle, SmallText, TextBody } from '../../assets/styles/typography';
import { actionEffect, BasicBlock, basicShadow, ButtonsRow } from '../../components/blocks';
import { COLORS } from '../../assets/styles/colors';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../../components/button';
import { coursesProgressData, extremelyRepeating, tasks } from '../../assets/shared/data/courses';
import { BlocksElementIcon } from '../../assets/images/icons/blocks-element-icon';
import { BREAKPOINTS, media } from '../../assets/styles/breakpoints';
import { DifficultyEnum, difficultyTypeData } from '../../assets/shared/constants/course';
import { StatusItem, StatusTypeItem } from '../../components/status-items';
import { getColorByPercentage } from '../../assets/shared/utils/color';
import { FaqIcon } from '../../assets/images/icons/header/faq-icon';
import { CardCarousel } from '../../components/card-carousel';
import taskTableCols from '../../assets/shared/utils/table/task-table-column';

export default function DashboardStudentPage() {
  const navigate = useNavigate();

  const sortedExtremelyRepeating = [...extremelyRepeating].sort(
    (a, b) =>
      difficultyTypeData[a.stateRepeating].order - difficultyTypeData[b.stateRepeating].order
  );

  return (
    <AppLayout className="">
      <BasicBlock width={'53%'}>
        <TableBlock $bgColor={COLORS.lighterBg} $gap={24}>
          <span className="d-flex gap-2 align-items-end">
            <CardTitle>Завдання на сьогодні</CardTitle>
            <TextBody $label $color={COLORS.primary}>
              (09.03.2026)
            </TextBody>
          </span>
          <SimpleTable
            data={tasks}
            columns={taskTableCols}
            isRowDisabled={(row) => row.completed}
          />
          <ButtonsRow>
            <Button
              type="large"
              width=""
              $brColor={COLORS.accent}
              $brWidth={'2'}
              onClick={() => navigate('/student/knowledge-tree')}
            >
              <TextBody $medium>Почати навчання</TextBody>
            </Button>
            <Button
              type="large"
              width=""
              $bgColor={'transparent'}
              $txtColor={COLORS.secondary}
              $brColor={COLORS.secondary}
              $brWidth={'2'}
              onClick={() => navigate('/student/knowledge-tree')}
            >
              <TextBody $medium>Показати більше</TextBody>
            </Button>
          </ButtonsRow>
        </TableBlock>
        <TableBlock
          $titleColor={COLORS.text}
          $bgColor={'transparent'}
          $brColor={COLORS.secondary}
          $gap={24}
          className={'align-items-start'}
        >
          <CardTitle>Потребує повторення</CardTitle>

          <span className="d-flex flex-wrap gap-2">
            {sortedExtremelyRepeating.map((item) => (
              <LineCard key={item.id}>
                <StatusItem
                  $type={StatusTypeItem.CIRCLE}
                  $color={difficultyTypeData[item.stateRepeating ?? DifficultyEnum.HIGH].color}
                />
                <span>
                  <TextBody $color={COLORS.text}>{item.topic}</TextBody>
                  <TextBody $medium $color={COLORS.secondaryDark}>
                    ({item.course})
                  </TextBody>
                </span>
              </LineCard>
            ))}
          </span>
          <Button
            type="large"
            width="auto"
            $brColor={COLORS.accent}
            $brWidth={'2'}
            onClick={() => navigate('/student/knowledge-tree')}
          >
            <TextBody $medium>Почати повторення</TextBody>
          </Button>
        </TableBlock>
      </BasicBlock>
      <BasicBlock width={'45%'}>
        <TableBlock
          $titleColor={COLORS.accent}
          $bgColor={'transparent'}
          $brColor={COLORS.secondary}
          $gap={24}
        >
          <CardTitle>Прогрес по курсах</CardTitle>

          <span className="d-flex flex-wrap gap-2">
            {coursesProgressData.map((item) => (
              <ProgressCard key={JSON.stringify(item)}>
                <span className="flex-nowrap">
                  <BlocksElementIcon />
                  <TextBody $label>{item.title}</TextBody>
                </span>
                <span>
                  <SmallText>Прогрес:</SmallText>
                  <TextBody $label>{item.progress}%</TextBody>
                </span>
                <span>
                  <SmallText>Тем завершено:</SmallText>
                  <TextBody $label>
                    {item.completedTopics} / {item.totalTopics}
                  </TextBody>
                </span>
                <span>
                  <SmallText>Середній результат:</SmallText>
                  <TextBody $label $color={getColorByPercentage(item.averageResult)}>
                    {item.averageResult}%
                  </TextBody>
                </span>
              </ProgressCard>
            ))}
          </span>
        </TableBlock>
        <TableBlock $gap={16} $bgColor={COLORS.lighterBg}>
          <CardTitle>Моя активність</CardTitle>
          <span className="d-flex justify-content-between flex-wrap gap-3">
            <TextBody>🔥 4 дні підряд</TextBody>
            <TextBody> ✔ 24 завдання </TextBody>
            <span className="d-flex gap-2 align-items-center">
              <TextBody>Успішність</TextBody>
              <TextBody $medium $color={getColorByPercentage(80)}>
                80%
              </TextBody>
            </span>
          </span>
        </TableBlock>
        <TableBlock $bgColor={COLORS.lighterBg} $gap={8} $titleColor={COLORS.primary}>
          <span className="d-flex gap-3 align-items-center">
            <FaqIcon size={24} color={COLORS.primary} />
            <CardTitle>Рекомендація системи</CardTitle>
          </span>
          <CardCarousel
            items={extremelyRepeating}
            renderCard={(card) => (
              <CarouselCardItem className="">
                <span>
                  <TextBody>{card.id}. Повторити тему</TextBody>
                  <TextBody $medium>"{card.topic}"</TextBody>
                </span>
                <TextBody>Ваш рівень засвоєння: {card.learning}%</TextBody>
                <Button
                  type="small"
                  width="auto"
                  $bgColor={COLORS.background}
                  $brColor={COLORS.secondary}
                  $txtColor={COLORS.secondary}
                  $brWidth={'2'}
                  onClick={() => navigate('/student/knowledge-tree')}
                >
                  <TextBody $medium>Перейти</TextBody>
                </Button>
              </CarouselCardItem>
            )}
          />
        </TableBlock>
      </BasicBlock>
    </AppLayout>
  );
}

const CarouselCardItem = styled.div`
  padding: 0 40px;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: start;

  span {
    display: flex;
    gap: 4px;
    width: 100%;
    flex-wrap: wrap;
  }
`;

const LineCard = styled.div`
  width: 100%;
  padding: 14px 24px;
  display: flex;
  min-width: 0;
  overflow: hidden;
  gap: 12px;
  ${basicShadow};
  border-radius: 12px;
  background-color: ${COLORS.lighterBg};

  ${actionEffect};

  div {
    margin-top: 1px;
  }

  span {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    gap: 12px;
    row-gap: 6px;
  }

  ${media(BREAKPOINTS.ml)} {
    padding: 14px 16px;
  }
`;

export const TableBlock = styled(BasicBlock)<{
  $brColor?: string;
  $titleColor?: string;
  $padding?: string;
}>`
  padding: ${({ $padding }) => $padding ?? '16px'};
  border-radius: 12px;
  justify-content: space-between;
  border: 1px solid ${({ $brColor }) => $brColor ?? 'transparent'};
  ${basicShadow};
  overflow: hidden;

  ${CardTitle} {
    color: ${({ $titleColor }) => $titleColor ?? COLORS.text};
  }

  ${media(BREAKPOINTS.sm)} {
    padding: 12px;
    gap: 16px;
  }

  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  ::-webkit-scrollbar-track {
    background-color: ${COLORS.background};
    border: 1px solid ${COLORS.boxShadow};
    border-radius: 100px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${COLORS.boxShadow};
    border: 1px solid ${COLORS.secondary};
    border-radius: 100px;
  }
`;

export const ProgressCard = styled.div`
  flex: 0 1 calc(50% - 8px);
  min-width: 0;
  max-width: calc(50% - 8px);

  background-color: ${COLORS.lighterBg};
  ${basicShadow};

  border-radius: 12px;
  padding: 16px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;

  ${actionEffect};

  ${SmallText} {
    font-size: 0.94rem;
    line-height: 1;
  }

  span {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    row-gap: 6px;
    align-items: center;
    width: 100%;

    svg {
      flex-shrink: 0;
    }

    &:first-child {
      padding-bottom: 4px;
      gap: 8px;
    }
  }

  ${media(BREAKPOINTS.lg)} {
    flex: 1 1 100%;
    max-width: 100%;
  }

  ${media(BREAKPOINTS.ml)} {
    flex: 0 1 calc(50% - 8px);
    max-width: calc(50% - 8px);
  }
`;
