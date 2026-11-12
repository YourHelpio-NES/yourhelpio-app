import { BlocksElementIcon } from '../../../../assets/images/icons/blocks-element-icon';
import { COLORS } from '../../../../assets/styles/colors';
import { CardTitle, TextBody } from '../../../../assets/styles/typography';
import { BasicBlock } from '../../../../components/blocks';
import { Button } from '../../../../components/button';
import { ProgressBar } from '../../../../components/progress-bar';
import { LabelValue } from '../../../../components/topic-details-content';
import { TableBlock } from '../../../student/dashboard';

import graphIcon from '../../../../assets/images/icons/graph-grow.png';
import { useCourseDetailsTeacher } from '../../../../assets/shared/hooks/useCourseDetailsStudent';
import { useParams } from 'react-router-dom';
import { useTeacherDashboard } from '../../../../assets/shared/hooks/useTeacherDashboard';
import {
  useCourseStudentsCount,
  useCourseTopicsCount,
} from '../../../../assets/shared/hooks/useStudentStatusBuckets';
import { useTeacherCoursesWithStats } from '../../../../assets/shared/hooks/useTeacherCoursesWithStats';

export default function OverviewDetailsCourseTab() {
  const { courseId } = useParams<{ courseId: string }>();
  const id = Number(courseId);

  const { course, isLoading } = useCourseDetailsTeacher(id);
  const { courses, isLoading: coursesLoading } = useTeacherCoursesWithStats();

  const { topicsCount } = useCourseTopicsCount(id);
  const { studentsCount } = useCourseStudentsCount(id);
  const { averageGrade } = useTeacherDashboard(id);

  console.log(course);
  console.log(courses);
  console.log(courseId);

  if (isLoading || !course || coursesLoading || !id) return <TextBody>Завантаження...</TextBody>;

  const details = courses.find((x) => x.id === id);
  console.log(details);

  if (!details) return <TextBody>Завантаження...</TextBody>;

  return (
    <>
      <BasicBlock
        $direction={'row'}
        $gap={24}
        className="align-items-start"
        $bgColor={COLORS.lighterBg}
      >
        <span className="d-flex flex-column gap-3 align-items-start">
          <span className="d-flex gap-2 align-items-start">
            <BlocksElementIcon size={28} />
            <CardTitle>{details.title}</CardTitle>
          </span>
          <TextBody>{details.description || 'Опис курсу не додано'}</TextBody>
        </span>
        <Button $type="large" width="auto" $txtColor={COLORS.background} $brWidth={'1'}>
          <TextBody $medium>Редагувати</TextBody>
        </Button>
      </BasicBlock>

      <BasicBlock
        $direction={'row'}
        $gap={24}
        className="justify-content-between"
        $bgColor={COLORS.lighterBg}
        width="100%"
      >
        <BasicBlock className="flex-grow-1" width="auto" $gap={24} $bgColor={COLORS.lighterBg}>
          <span className="d-flex flex-column gap-2">
            <LabelValue label="Дата створення:">
              <TextBody $medium>
                {new Date(details.created_at).toLocaleDateString('uk-UA')}
              </TextBody>
            </LabelValue>
            <LabelValue label="Кількість тем:">
              <TextBody $medium>{topicsCount}</TextBody>
            </LabelValue>
          </span>
          <span className="d-flex flex-column gap-2">
            <LabelValue label="Записано студентів:">
              <TextBody $medium>{studentsCount}</TextBody>
            </LabelValue>
            {/* <LabelValue label="Код запрошення:">
              <TextBody $medium>{details.invite_code}</TextBody>
            </LabelValue> */}
          </span>
        </BasicBlock>

        <BasicBlock
          className="flex-grow-1 align-items-start"
          width={'auto'}
          $gap={16}
          $bgColor={COLORS.lighterBg}
        >
          <TableBlock
            width={'100%'}
            $gap={16}
            $bgColor={COLORS.lighterBg}
            $titleColor={COLORS.primary}
          >
            <span className="d-flex gap-2 align-items-center">
              <img src={graphIcon} alt="graph-grow-icon" width={28} height={28} />
              <TextBody $medium>Середній прогрес</TextBody>
              <CardTitle className="ms-auto" style={{ color: COLORS.primary }}>
                {averageGrade}%
              </CardTitle>
            </span>
            <ProgressBar value={averageGrade} showPercent={false} />
          </TableBlock>
        </BasicBlock>
      </BasicBlock>
    </>
  );
}
