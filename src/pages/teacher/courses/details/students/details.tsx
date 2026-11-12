import { useParams, useSearchParams } from 'react-router-dom';
import { COLORS } from '../../../../../assets/styles/colors';
import { BasicBlock } from '../../../../../components/blocks';
import { StudentCardIcon } from '../../../../../assets/images/icons/student-card-icon';
import { CardTitle, TextBody } from '../../../../../assets/styles/typography';
import { EmailCell } from '../../../../../assets/shared/utils/table/student';
import { StudentStatusButton } from '../../../../../components/row-table-action';
import { StudentStatusEnum } from '../../../../../assets/shared/constants/student';
import { useCourseStudents } from '../../../../../assets/shared/hooks/useStudentStatusBuckets';
import {
  useTeacherDashboard,
  RANK_LABELS,
} from '../../../../../assets/shared/hooks/useTeacherDashboard';

export default function StudentsDetailsCourseTab() {
  const { courseId } = useParams<{ courseId: string }>();
  const id = Number(courseId);

  const [searchParams] = useSearchParams();
  const studentId = Number(searchParams.get('id'));

  const { students } = useCourseStudents(id);
  const { data } = useTeacherDashboard(id);

  const student = students.find((s) => s.id === studentId);
  const studentProgress = data?.heatmap.find((h) => h.student_id === studentId);
  const gradeInfo = data?.grade_vs_rank.find((g) => g.student_id === studentId);

  if (!student || !studentProgress) return <TextBody>Завантаження...</TextBody>;

  const completedCount = studentProgress.topics.filter((t) => t.progress_pct >= 90).length;

  return (
    <>
      <BasicBlock $gap={12} $bgColor={COLORS.lighterBg}>
        <span className="w-100 d-flex gap-3 align-items-center">
          <StudentCardIcon />
          <CardTitle>{student.full_name}</CardTitle>
          {gradeInfo && <StudentStatusButton status={StudentStatusEnum.IN_PROGRESS} width="auto" />}
        </span>
        <EmailCell email={student.email} />
      </BasicBlock>
      <span className="w-100 d-flex gap-2 align-items-center">
        <TextBody>Загальний прогрес по курсу:</TextBody>
        <TextBody $medium>
          {completedCount} з {studentProgress.topics.length} тем завершено
        </TextBody>
      </span>
      {gradeInfo && (
        <TextBody>
          Оцінка: {gradeInfo.grade}/5, ранг: {RANK_LABELS[gradeInfo.rank]}, перемикань вкладки:{' '}
          {gradeInfo.tab_switches}
        </TextBody>
      )}
    </>
  );
}
