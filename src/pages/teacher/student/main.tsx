import { useState } from 'react';
import { CardTitle, TextBody } from '../../../assets/styles/typography';
import Input from '../../../components/input';
import AppLayout from '../../../components/widgets/app/layout';
import { InputTypeEnum } from '../../../assets/shared/constants/input';
import { Button } from '../../../components/button';
import { BasicBlock } from '../../../components/blocks';
import { SimpleTable } from '../../../components/table';
import { studentsMock } from '../../../assets/shared/data/students';
import studentsTableMainCols from '../../../assets/shared/utils/table/student';
import type { StudentMain } from '../../../assets/shared/constants/student';
import { useNavigate } from 'react-router-dom';

export default function MainStudentsPage() {
  const [searchValue, setSearchValue] = useState<string>('');
  const navigate = useNavigate();

  const handleRowClick = (row: StudentMain) => {
    navigate(`/teacher/students/details?id=${row.id}`);
  };

  return (
    <AppLayout>
      <BasicBlock width={'100%'} className="align-items-start" $gap={24}>
        <span className="w-100 d-flex flex-column gap-3">
          <CardTitle>Студенти ваших курсів</CardTitle>
          <span className="d-flex gap-2 w-75">
            <Input
              value={searchValue}
              setValue={setSearchValue}
              type={InputTypeEnum.TEXT}
              placeholder="Введіть email або ім’я чи прізвище для пошуку..."
            />
            <Button>
              <TextBody>Пошук</TextBody>
            </Button>
          </span>
        </span>
      </BasicBlock>
      <SimpleTable
        data={studentsMock}
        columns={studentsTableMainCols}
        showHeader
        onRowClick={(row) => handleRowClick(row)}
      />
    </AppLayout>
  );
}
