import AppLayout from '../../components/widgets/app/layout';
import RadioButton from '../../components/radio';
import { SimpleTable } from '../../components/table';
import type { ColumnDef } from '@tanstack/react-table';
import { CardTitle, TextBody } from '../../assets/styles/typography';
import { BasicBlock } from '../../components/blocks';
import { COLORS } from '../../assets/styles/colors';

interface TaskRow {
  id: string;
  name: string;
  day: string;
  type: string;
  questions: number;
  completed: boolean;
}

const columns: ColumnDef<TaskRow>[] = [
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

const tasks: TaskRow[] = [
  {
    id: '1',
    name: 'Алгоритми проєктування',
    day: 'День 0',
    type: 'Повторення',
    questions: 8,
    completed: true,
  },
  {
    id: '2',
    name: 'Математичний аналіз',
    day: 'День 7',
    type: 'Мікротест',
    questions: 10,
    completed: false,
  },
  {
    id: '3',
    name: 'Бази даних',
    day: 'День 1',
    type: 'Короткий контроль',
    questions: 5,
    completed: false,
  },
];

export default function DashboardPage() {
  //   const navigate = useNavigate();

  return (
    <AppLayout>
      <BasicBlock $bgColor={COLORS.lighterBg} width={'60%'}>
        <CardTitle>Завдання на сьогодні</CardTitle>
        <SimpleTable
          data={tasks}
          columns={columns}
          // showHeader
          onRowClick={() => {}}
          isRowDisabled={(row) => row.completed}
          //   onRowClick={(row) => {navigate(`/student/knowledge-tree/${row.id}`)}}
        />
      </BasicBlock>
    </AppLayout>
  );
}
