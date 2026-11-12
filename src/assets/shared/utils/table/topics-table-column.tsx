import type { ColumnDef } from '@tanstack/react-table';
import { TextBody } from '../../../styles/typography';
import { PasswordIcon } from '../../../images/icons/password-icon';
import { DoneIcon } from '../../../images/icons/done-icon';
import { COLORS } from '../../../styles/colors';
import { TopicDetailsStatusEnum, type TopicDetailTeacherRow } from '../../constants/details-course';
import {
  RowTableActions,
  StatusTopicButton,
  type TopicTableMeta,
} from '../../../../components/row-table-action';
import { getColorByPercentage } from '../color';
import type { CourseTopicProgress } from '../../../../api/courses/details.types';
import { StudyDayEnum, studyDayLabels } from '../../constants/topicDays';
import type { TopicListItem } from '../../../../api/courses/courses.types';

const topicsTableCols: ColumnDef<CourseTopicProgress>[] = [
  {
    accessorKey: 'topicName',
    cell: ({ row }) => (
      <span className="d-flex gap-3 align-items-center">
        <TextBody>{row.original.topic_id}.</TextBody>
        <TextBody $medium>{row.original.title}</TextBody>
      </span>
    ),
    header: 'Тема',
  },
  {
    accessorKey: 'stage',
    cell: ({ row }) => (
      <TextBody>
        {row.original.stage ? studyDayLabels[row.original.stage as StudyDayEnum] : '—'}
      </TextBody>
    ),
    header: 'Етап',
  },
  {
    accessorKey: 'progress',
    cell: ({ row }) =>
      row.original.progress_pct !== 0 ? (
        <span className="d-flex gap-2 align-items-center">
          <TextBody>{row.original.progress_pct}%</TextBody>
          {row.original.progress_pct === 100 && <DoneIcon color={COLORS.status.success} />}
        </span>
      ) : (
        <PasswordIcon size={22} />
      ),
    header: 'Прогрес',
  },
];

export default topicsTableCols;

export const topicsTeacherTableCol: ColumnDef<TopicDetailTeacherRow>[] = [
  {
    accessorKey: 'topicName',
    cell: ({ row }) => (
      <span className="d-flex gap-3 align-items-center">
        <TextBody>{row.original.id}.</TextBody>
        <TextBody $medium>{row.original.topicName}</TextBody>
      </span>
    ),
    header: 'Тема',
  },
  {
    accessorKey: 'status',
    cell: ({ row }) => <StatusTopicButton status={row.original.status} />,
    header: 'Статус',
  },
  {
    id: 'actions',
    header: '',
    cell: ({ row, table }) => {
      const meta = table.options.meta as TopicTableMeta;
      return (
        <RowTableActions
          onEdit={() => meta.onEdit(row.original)}
          onDelete={() => meta.onDelete(row.original)}
        />
      );
    },
  },
];

export const topicsTableColumns: ColumnDef<TopicListItem>[] = [
  {
    accessorKey: 'topicName',
    cell: ({ row }) => (
      <span className="d-flex gap-3 align-items-center">
        <TextBody>{row.index + 1}.</TextBody>
        <TextBody $medium>{row.original.title}</TextBody>
      </span>
    ),
    header: 'Тема',
  },
  {
    accessorKey: 'status',
    cell: ({ row }) => <StatusTopicButton status={row.original.status as TopicDetailsStatusEnum} />,
    header: 'Статус',
  },
  {
    id: 'actions',
    header: '',
    cell: ({ row, table }) => {
      const meta = table.options.meta as TopicTableMeta;
      return (
        <RowTableActions
          onEdit={() =>
            meta.onEdit({
              topicName: row.original.title,
              id: row.original.id.toString(),
              status: row.original.status as TopicDetailsStatusEnum,
            })
          }
          onDelete={() =>
            meta.onDelete({
              topicName: row.original.title,
              id: row.original.id.toString(),
              status: row.original.status as TopicDetailsStatusEnum,
            })
          }
        />
      );
    },
  },
];

export const topicsProblemTeacherTableCol: ColumnDef<{
  topicId: number;
  title: string;
  avgProgress: number;
}>[] = [
  {
    accessorKey: 'topicName',
    cell: ({ row }) => (
      <span className="d-flex gap-3 align-items-center">
        <TextBody>{row.original.topicId}.</TextBody>
        <TextBody $medium>{row.original.title}</TextBody>
      </span>
    ),
    header: 'Тема',
  },
  {
    id: 'level',
    header: 'Рівень засвоєння',
    cell: ({ row }) => (
      <TextBody $medium $color={getColorByPercentage(row.original.avgProgress)}>
        {row.original.avgProgress}%
      </TextBody>
    ),
  },
];
