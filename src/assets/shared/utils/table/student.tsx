import type { ColumnDef } from '@tanstack/react-table';
import type { StudentMain } from '../../constants/student';
import { TextBody } from '../../../styles/typography';
import { CopyBtn } from './student-topic-column';
import { CopyIcon } from '../../../images/icons/copy-icon';
import showToast from '../../../../components/toast/show';
import { ToastTypeEnum } from '../../constants/custom-toast';

const studentsTableMainCols: ColumnDef<StudentMain>[] = [
  {
    accessorKey: 'fullName',
    header: 'Ім’я / Прізвище студента',
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
];

export default studentsTableMainCols;

export function EmailCell({ email }: { email: string }) {
  const handleCopy = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    try {
      await navigator.clipboard.writeText(email);
      showToast(ToastTypeEnum.SUCCESS, 'Email успішно скопійовано');
    } catch {
      showToast(ToastTypeEnum.ERROR, 'Не вдалося скопіювати email');
    }
  };

  return (
    <span className="d-flex align-items-center gap-2">
      <TextBody>{email}</TextBody>

      <CopyBtn
        type="button"
        aria-label="Скопіювати email"
        title="Скопіювати email"
        onClick={handleCopy}
      >
        <CopyIcon />
      </CopyBtn>
    </span>
  );
}
