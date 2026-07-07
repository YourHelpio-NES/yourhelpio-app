import type { ColumnDef } from '@tanstack/react-table';
import styled from 'styled-components';
import type { StudentTopic } from '../../constants/student';
import { TextBody } from '../../../styles/typography';
import { StudentStatusButton } from '../../../../components/row-table-action';
import { EmailCell } from './student';

export const CopyBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  flex-shrink: 0;
  padding: 0;
`;

export const studentsTableColumns: ColumnDef<StudentTopic>[] = [
  {
    accessorKey: 'fullName',
    header: "Ім'я / Прізвище студента",
    cell: ({ row }) => (
      <TextBody $medium>
        {row.index + 1}. {row.original.fullName}
      </TextBody>
    ),
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => <EmailCell email={row.original.email} />,
  },
  {
    accessorKey: 'group',
    header: 'Група',
    cell: ({ row }) => <TextBody>{row.original.group}</TextBody>,
  },
  {
    accessorKey: 'progress',
    header: 'Прогрес',
    cell: ({ row }) => (
      <TextBody>{row.original.progress !== null ? `${row.original.progress}%` : '–'}</TextBody>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Статус',
    cell: ({ row }) => <StudentStatusButton status={row.original.status} />,
  },
];
