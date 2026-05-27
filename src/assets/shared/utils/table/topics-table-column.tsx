import type { ColumnDef } from '@tanstack/react-table';
import type { ThemeTableRow } from './row-type';
import { TextBody } from '../../../styles/typography';
import { PasswordIcon } from '../../../images/icons/password-icon';
import { DoneIcon } from '../../../images/icons/done-icon';
import { COLORS } from '../../../styles/colors';

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
