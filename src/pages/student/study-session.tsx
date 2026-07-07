import { useNavigate } from 'react-router-dom';
import { tasks } from '../../assets/shared/data/courses';
import { formatDate, getToday, getTomorrow } from '../../assets/shared/utils/date';
import taskTableCols from '../../assets/shared/utils/table/task-table-column';
import { COLORS } from '../../assets/styles/colors';
import { CardTitle, TextBody } from '../../assets/styles/typography';
import { BasicBlock } from '../../components/blocks';
import { Line } from '../../components/status-items';
import { SimpleTable } from '../../components/table';
import AppLayout from '../../components/widgets/app/layout';
import { TableBlock } from './dashboard';

export default function StudySessionMainPage() {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <BasicBlock>
        <TableBlock $bgColor={COLORS.lighterBg}>
          <span className="d-flex gap-2 align-items-end">
            <CardTitle>Завдання на сьогодні</CardTitle>
            <TextBody $label $color={COLORS.primary}>
              ({formatDate(getToday())})
            </TextBody>
          </span>
          <SimpleTable
            data={tasks}
            columns={taskTableCols}
            isRowDisabled={(row) => row.completed}
            onRowClick={() => {
              navigate(`/student/study-session/topics/details?id=1`);
            }}
          />
        </TableBlock>
        <Line />
        <TableBlock $bgColor={COLORS.lighterBg} $titleColor={COLORS.status.success}>
          <span className="d-flex gap-2 align-items-end">
            <CardTitle>Завдання на завтра</CardTitle>
            <TextBody $label $color={COLORS.primary}>
              ({formatDate(getTomorrow())})
            </TextBody>
          </span>
          <SimpleTable data={tasks} columns={taskTableCols} />
        </TableBlock>
        <TableBlock $bgColor={COLORS.lighterBg} $titleColor={COLORS.status.error}>
          <span className="d-flex gap-2 align-items-end">
            <CardTitle>Прострочені завдання</CardTitle>
          </span>
          <SimpleTable data={tasks} columns={taskTableCols} />
        </TableBlock>
      </BasicBlock>
    </AppLayout>
  );
}
