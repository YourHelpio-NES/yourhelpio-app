import type { ColumnDef } from '@tanstack/react-table';
import type { TaskTableRow } from './row-type';
import { TextBody } from '../../../styles/typography';
import RadioButton from '../../../../components/radio';

const taskTableCols: ColumnDef<TaskTableRow>[] = [
  {
    accessorKey: 'stage',
    cell: ({ row }) => <RadioButton value={row.original.completed} type="state" />,
  },
  {
    accessorKey: 'name',
    cell: ({ row }) => <TextBody $medium>{row.original.name}</TextBody>,
  },
  { accessorKey: 'day', cell: ({ row }) => <TextBody>{row.original.day}</TextBody> },
  { accessorKey: 'type', cell: ({ row }) => <TextBody>{row.original.type}</TextBody> },
  {
    accessorKey: 'questions',
    cell: ({ row }) => <TextBody>{row.original.questions} запитань</TextBody>,
  },
];

export default taskTableCols;
