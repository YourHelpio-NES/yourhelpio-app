import { useNavigate } from 'react-router-dom';
import { formatDate, getToday, getTomorrow } from '../../assets/shared/utils/date';
import { getTaskTableCols } from '../../assets/shared/utils/table/task-table-column';
import { COLORS } from '../../assets/styles/colors';
import { CardTitle, TextBody } from '../../assets/styles/typography';
import { BasicBlock } from '../../components/blocks';
import { Line } from '../../components/status-items';
import { SimpleTable } from '../../components/table';
import AppLayout from '../../components/widgets/app/layout';
import { TableBlock } from './dashboard';
import { useReviewNeeded } from '../../assets/shared/hooks/useReviewNeeded';
import { useMemo } from 'react';

export default function StudySessionMainPage() {
  const { isLoading, overdueItems, todayItems, tomorrowItems } = useReviewNeeded();
  const navigate = useNavigate();

  const tasksColumns = useMemo(
    () =>
      getTaskTableCols(
        (id) => navigate(`/student/study-session/topics/details?id=${id}`),
        (id) => navigate(`/student/study-plan?course=${id}`)
      ),
    [navigate]
  );

  return (
    <AppLayout loadingState={isLoading}>
      <BasicBlock>
        <TableBlock $bgColor={COLORS.lighterBg}>
          <span className="d-flex gap-2 align-items-end">
            <CardTitle>Завдання на сьогодні</CardTitle>
            <TextBody $label $color={COLORS.primary}>
              ({formatDate(getToday())})
            </TextBody>
          </span>
          {todayItems.length === 0 ? (
            <span className="d-flex flex-column align-items-start gap-2">
              <TextBody $medium>Завдань немає</TextBody>
              <TextBody>
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
        </TableBlock>
        <Line />
        <TableBlock $bgColor={COLORS.lighterBg} $titleColor={COLORS.status.success}>
          <span className="d-flex gap-2 align-items-end">
            <CardTitle>Завдання на завтра</CardTitle>
            <TextBody $label $color={COLORS.primary}>
              ({formatDate(getTomorrow())})
            </TextBody>
          </span>
          {tomorrowItems.length === 0 ? (
            <span className="d-flex flex-column align-items-start gap-2">
              <TextBody $medium>Завдань немає</TextBody>
              <TextBody>
                Продовжуйте вивчати нові теми – повторення з'являться автоматично.
              </TextBody>
            </span>
          ) : (
            <SimpleTable
              data={tomorrowItems}
              columns={tasksColumns}
              isRowDisabled={(row) => row.is_overdue}
            />
          )}
        </TableBlock>
        <TableBlock $bgColor={COLORS.lighterBg} $titleColor={COLORS.status.error}>
          <span className="d-flex gap-2 align-items-end">
            <CardTitle>Прострочені завдання</CardTitle>
          </span>
          {overdueItems.length === 0 ? (
            <span className="d-flex flex-column align-items-start gap-2">
              <TextBody $medium>Завдань немає</TextBody>
              <TextBody>
                Продовжуйте вивчати нові теми – повторення з'являться автоматично.
              </TextBody>
            </span>
          ) : (
            <SimpleTable
              data={overdueItems}
              columns={tasksColumns}
              isRowDisabled={(row) => !row.is_overdue}
            />
          )}
        </TableBlock>
      </BasicBlock>
    </AppLayout>
  );
}
