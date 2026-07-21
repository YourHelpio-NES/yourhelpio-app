import AppLayout from '../../components/widgets/app/layout';
import { SimpleTable } from '../../components/table';
import { CardTitle, TextBody } from '../../assets/styles/typography';
import { actionEffect, BasicBlock, basicShadow, ButtonsRow } from '../../components/blocks';
import { COLORS } from '../../assets/styles/colors';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../../components/button';
import { BREAKPOINTS, media } from '../../assets/styles/breakpoints';
import { difficultyTypeData } from '../../assets/shared/constants/course';
import { StatusItem, StatusTypeItem } from '../../components/status-items';
import { getColorByPercentage } from '../../assets/shared/utils/color';
import { FaqIcon } from '../../assets/images/icons/header/faq-icon';
import { CardCarousel } from '../../components/card-carousel';
import { getTaskTableCols } from '../../assets/shared/utils/table/task-table-column';
import { useTasksSchedule } from '../../assets/shared/hooks/useTasksSchedule';
import { useEnrolledCourses } from '../../assets/shared/hooks/useEnrolledCourses';
import ProgressCardItem from '../../components/progress-card';
import { useReviewNeeded } from '../../assets/shared/hooks/useReviewNeeded';
import {
  useActivityStats,
  useSystemRecommendation,
} from '../../assets/shared/hooks/useActivityStats';
import { useMemo } from 'react';

export default function DashboardStudentPage() {
  const { isLoading, todayItems } = useTasksSchedule();
  const { courses, isLoading: courseLoading } = useEnrolledCourses();
  const { items: reviewItems, isLoading: reviewLoading } = useReviewNeeded();
  const { stats, isLoading: statsLoading } = useActivityStats();
  const recommendation = useSystemRecommendation(reviewItems);

  const navigate = useNavigate();
  const today = new Date().toLocaleDateString('uk-UA');

  const tasksColumns = useMemo(
    () =>
      getTaskTableCols(
        (id) => navigate(`/student/study-session/topics/details?id=${id}`),
        (id) => navigate(`/student/study-plan?course=${id}`)
      ),
    [navigate]
  );

  return (
    <AppLayout
      className=""
      loadingState={isLoading || courseLoading || reviewLoading || statsLoading}
    >
      <BasicBlock width={'53%'}>
        <TableBlock $bgColor={COLORS.lighterBg} $gap={24}>
          <span className="d-flex gap-2 align-items-end">
            <CardTitle>Завдання на сьогодні</CardTitle>
            <TextBody $label $color={COLORS.primary}>
              ({today})
            </TextBody>
          </span>
          {todayItems.length === 0 ? (
            <span className="d-flex flex-column align-items-center gap-2">
              <TextBody $medium>На сьогодні завдань немає</TextBody>
              <TextBody className="text-center">
                Продовжуйте вивчати нові теми – повторення з'являться автоматично.
              </TextBody>
            </span>
          ) : (
            <SimpleTable
              data={todayItems}
              columns={tasksColumns}
              isRowDisabled={(row) => row.is_overdue}
            />
          )}
          <ButtonsRow>
            <Button
              $type="large"
              width=""
              $brColor={COLORS.accent}
              $brWidth={'2'}
              onClick={() => navigate('/student/knowledge-tree')}
            >
              <TextBody $medium>Почати навчання</TextBody>
            </Button>
            {todayItems.length > 0 && (
              <Button
                $type="large"
                width=""
                $bgColor={'transparent'}
                $txtColor={COLORS.secondary}
                $brColor={COLORS.secondary}
                $brWidth={'2'}
                onClick={() => navigate('/student/knowledge-tree')}
              >
                <TextBody $medium>Показати більше</TextBody>
              </Button>
            )}
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

          {reviewLoading && <TextBody>Завантаження...</TextBody>}
          {!reviewLoading && reviewItems.length === 0 && <TextBody>Все актуально</TextBody>}
          <span className="d-flex flex-wrap gap-2">
            {reviewItems.map((item, index) => (
              <LineCard key={item.topic_id}>
                <StatusItem
                  $type={StatusTypeItem.CIRCLE}
                  $color={Object.values(difficultyTypeData)[index].color}
                />
                <span>
                  <TextBody $color={COLORS.text}>{item.topic_title}</TextBody>
                  <TextBody $medium $color={COLORS.secondaryDark}>
                    ({item.course_title})
                  </TextBody>
                </span>
              </LineCard>
            ))}
          </span>
          <Button
            $type="large"
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

          <span data-type="progress-cards" className="d-flex flex-wrap gap-2">
            {courses.map((item) => (
              <ProgressCardItem key={item.id} item={item} />
            ))}
          </span>
        </TableBlock>
        <TableBlock $gap={16} $bgColor={COLORS.lighterBg}>
          <CardTitle>Моя активність</CardTitle>
          {statsLoading && <TextBody>Завантаження...</TextBody>}
          {stats && (
            <span className="d-flex justify-content-between flex-wrap gap-3">
              <TextBody>
                🔥 {stats.streak} {stats.streak === 1 ? 'день' : 'дні'} підряд
              </TextBody>
              <TextBody>✔ {stats.total_answers} завдань</TextBody>
              <span className="d-flex gap-2 align-items-center">
                <TextBody>Успішність – </TextBody>
                <TextBody $medium $color={getColorByPercentage(80)}>
                  {stats.accuracy_pct !== null ? `${stats.accuracy_pct}%` : '—'}
                </TextBody>
              </span>
            </span>
          )}
        </TableBlock>
        <TableBlock $bgColor={COLORS.lighterBg} $gap={8} $titleColor={COLORS.primary}>
          <span className="d-flex gap-3 align-items-center">
            <FaqIcon size={24} color={COLORS.primary} />
            <CardTitle>Рекомендація системи</CardTitle>
          </span>
          {recommendation ? (
            <CardCarousel
              items={[recommendation]}
              renderCard={(card, index) => (
                <CarouselCardItem className="">
                  <span>
                    <TextBody>
                      {index + 1}. {card.reason}
                    </TextBody>
                    <TextBody $medium>"{card.topic_title}"</TextBody>
                  </span>
                  <TextBody>({card.course_title})</TextBody>
                  <Button
                    $type="small"
                    width="auto"
                    $bgColor={COLORS.background}
                    $brColor={COLORS.secondary}
                    $txtColor={COLORS.secondary}
                    $brWidth={'2'}
                    onClick={() =>
                      navigate(`/student/study-session/topics/details?id=${card.topic_id}`)
                    }
                  >
                    <TextBody $medium>Перейти</TextBody>
                  </Button>
                </CarouselCardItem>
              )}
            />
          ) : (
            <TextBody>Немає рекомендацій — усе під контролем </TextBody>
          )}
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

  span[data-type='progress-cards'] {
    max-height: 158px;
    overflow-y: auto;
  }
`;
