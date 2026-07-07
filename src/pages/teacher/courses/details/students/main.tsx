import { useState } from 'react';
import { CardTitle, TextBody } from '../../../../../assets/styles/typography';
import { BasicBlock } from '../../../../../components/blocks';
import Input from '../../../../../components/input';
import { InputTypeEnum } from '../../../../../assets/shared/constants/input';
import { Button } from '../../../../../components/button';
import { COLORS } from '../../../../../assets/styles/colors';
import { SimpleTable } from '../../../../../components/table';
import { MOCK_STUDENTS } from '../../../../../assets/shared/data/topic-students';
import { studentsTableColumns } from '../../../../../assets/shared/utils/table/student-topic-column';
import type { StudentTopic } from '../../../../../assets/shared/constants/student';
import { useNavigate } from 'react-router-dom';

export default function StudentsMainCourseTab() {
  const [searchValue, setSearchValue] = useState<string>('');
  const navigate = useNavigate();

  const handleRowClick = (row: StudentTopic) => {
    navigate(`/teacher/courses/details/students/details?id=${row.id}`);
  };
  return (
    <>
      <BasicBlock
        $direction={'row'}
        $gap={16}
        className="align-items-start justify-content-between flex-lg-row flex-sm-column-reverse flex-column-reverse"
        $bgColor={COLORS.lighterBg}
      >
        <span className="d-flex flex-column gap-md-3 gap-2 align-items-start">
          <CardTitle>Керування і контроль студентів</CardTitle>
          <span className="d-flex gap-2 w-100 flex-grow-1">
            <Input
              value={searchValue}
              setValue={setSearchValue}
              type={InputTypeEnum.TEXT}
              placeholder="Введіть ключові слова..."
              label=""
            />
            <Button>
              <TextBody>Пошук</TextBody>
            </Button>
          </span>
        </span>
        <Button
          $bgColor={'transparent'}
          $txtColor={COLORS.accent}
          $brColor={COLORS.accent}
          $brWidth={'2'}
        >
          <TextBody $medium>Запросити студента</TextBody>
        </Button>
      </BasicBlock>
      <SimpleTable
        data={MOCK_STUDENTS}
        columns={studentsTableColumns}
        showHeader={true}
        onRowClick={(row) => handleRowClick(row)}
      />
    </>
  );
}
