import type { ColumnDef } from '@tanstack/react-table';
import type { ThemeTableRow } from './row-type';
import { TextBody } from '../../../styles/typography';
import { PasswordIcon } from '../../../images/icons/password-icon';
import { DoneIcon } from '../../../images/icons/done-icon';
import { COLORS } from '../../../styles/colors';
import {
  type TopicDetailTeacherRow,
  type TopicProblemTeacherRow,
} from '../../constants/details-course';
import {
  RowTableActions,
  StatusTopicButton,
  type TopicTableMeta,
} from '../../../../components/row-table-action';
import { getColorByPercentage } from '../color';

const topicsTableCols: ColumnDef<ThemeTableRow>[] = [
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
    accessorKey: 'stage',
    cell: ({ row }) => <TextBody>{row.original.stage ?? '—'}</TextBody>,
    header: 'Етап',
  },
  {
    accessorKey: 'progress',
    cell: ({ row }) =>
      row.original.progress ? (
        <span className="d-flex gap-2 align-items-center">
          <TextBody>{row.original.progress}%</TextBody>
          {row.original.progress === '100' && <DoneIcon color={COLORS.status.success} />}
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

export const topicsProblemTeacherTableCol: ColumnDef<TopicProblemTeacherRow>[] = [
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
    accessorKey: 'group',
    cell: ({ row }) => <TextBody>{row.original.group}</TextBody>,
    header: 'Група',
  },
  {
    id: 'level',
    header: 'Рівень засвоєння',
    cell: ({ row }) => (
      <TextBody $medium $color={getColorByPercentage(row.original.level)}>
        {row.original.level}%
      </TextBody>
    ),
  },
];
