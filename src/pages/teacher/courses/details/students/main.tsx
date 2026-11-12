import { useState } from 'react';
import { CardTitle, TextBody } from '../../../../../assets/styles/typography';
import { BasicBlock } from '../../../../../components/blocks';
import Input from '../../../../../components/input';
import { InputTypeEnum } from '../../../../../assets/shared/constants/input';
import { COLORS } from '../../../../../assets/styles/colors';
import { SimpleTable } from '../../../../../components/table';
import { studentsTableTeacherColumns } from '../../../../../assets/shared/utils/table/student-topic-column';
import { useNavigate, useParams } from 'react-router-dom';
import { useCourseStudents } from '../../../../../assets/shared/hooks/useStudentStatusBuckets';
import type { TeacherStudent } from '../../../../../api/courses/courses.types';

export default function StudentsMainCourseTab() {
  const { courseId } = useParams<{ courseId: string }>();
  const id = Number(courseId);

  const [searchValue, setSearchValue] = useState('');
  const { students, isLoading } = useCourseStudents(id);
  const navigate = useNavigate();

  const filtered = students.filter((s) =>
    s.full_name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleRowClick = (row: TeacherStudent) => {
    navigate(`/teacher/courses/${id}/students/details?id=${row.id}`);
  };

  return (
    <>
      <BasicBlock $direction={'row'} $gap={16} $bgColor={COLORS.lighterBg}>
        <span className="d-flex flex-column gap-2 align-items-start">
          <CardTitle>Керування і контроль студентів</CardTitle>
          <Input
            value={searchValue}
            setValue={setSearchValue}
            type={InputTypeEnum.TEXT}
            placeholder="Пошук..."
            label=""
          />
        </span>
      </BasicBlock>
      {isLoading ? (
        <TextBody>Завантаження...</TextBody>
      ) : (
        <SimpleTable
          data={filtered}
          columns={studentsTableTeacherColumns}
          showHeader
          getRowId={(r) => r.id}
          onRowClick={handleRowClick}
        />
      )}
    </>
  );
}
