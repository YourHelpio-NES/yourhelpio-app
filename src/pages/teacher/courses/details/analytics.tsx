import { COLORS } from '../../../../assets/styles/colors';
import { CardTitle, TextBody } from '../../../../assets/styles/typography';
import { BasicBlock } from '../../../../components/blocks';
import { ProgressBar } from '../../../../components/progress-bar';
import { TableBlock } from '../../../student/dashboard';
import graphIcon from '../../../../assets/images/icons/graph-grow.png';
import { CourseCard } from '../main';
import { StudentStatusButton } from '../../../../components/row-table-action';
import { StudentStatusEnum } from '../../../../assets/shared/constants/student';
import { SimpleTable } from '../../../../components/table';
import { topicsProblemTeacherTableCol } from '../../../../assets/shared/utils/table/topics-table-column';
import { useTeacherDashboard } from '../../../../assets/shared/hooks/useTeacherDashboard';
import { useStudentStatusBuckets } from '../../../../assets/shared/hooks/useStudentStatusBuckets';
import { useParams } from 'react-router-dom';

export default function AnalyticsDetailsCourseTab() {
  const { courseId } = useParams<{ courseId: string }>();
  const id = Number(courseId);

  const { data, averageGrade, weakestTopics } = useTeacherDashboard(id);
  const buckets = useStudentStatusBuckets(data?.heatmap ?? []);

  return (
    <>
      <BasicBlock
        $direction={'row'}
        $gap={16}
        className="align-items-start justify-content-between"
        $bgColor={COLORS.lighterBg}
      >
        <span className="d-flex flex-column gap-2 align-items-start">
          <CardTitle>Аналітика курсу</CardTitle>
          <TextBody>Огляд прогресу студентів та ефективності навчання</TextBody>
        </span>
        <TableBlock
          width={'30%'}
          $gap={16}
          $bgColor={COLORS.lighterBg}
          $titleColor={COLORS.primary}
        >
          <span className="d-flex gap-1 align-items-center">
            <img src={graphIcon} alt="graph-grow-icon" width={28} height={28} />
            <TextBody $medium>Середній прогрес</TextBody>
            <CardTitle className="ms-auto" style={{ color: COLORS.primary }}>
              {averageGrade}%
            </CardTitle>
          </span>
          <ProgressBar value={averageGrade} showPercent={false} />
        </TableBlock>
      </BasicBlock>

      {buckets && (
        <BasicBlock $gap={12} className="flex-wrap" $bgColor="transparent" $direction={'row'}>
          <CourseCard className="gap-2 justify-content-start border">
            <span className="d-flex justify-content-between">
              <StudentStatusButton status={StudentStatusEnum.IN_PROGRESS} width="auto" />
              <TextBody $medium>{buckets.inProgressPct}%</TextBody>
            </span>
            <TextBody>Студенти, які активно проходять курс</TextBody>
          </CourseCard>
          <CourseCard className="gap-2 justify-content-start border">
            <span className="d-flex justify-content-between">
              <StudentStatusButton status={StudentStatusEnum.COMPLETED} width="auto" />
              <TextBody $medium>{buckets.completedPct}%</TextBody>
            </span>
            <TextBody>Частка студентів, які повністю завершили курс</TextBody>
          </CourseCard>
          <CourseCard className="gap-2 justify-content-start border">
            <span className="d-flex justify-content-between">
              <StudentStatusButton status={StudentStatusEnum.NOT_STARTED} width="auto" />
              <TextBody $medium>{buckets.notStartedPct}%</TextBody>
            </span>
            <TextBody>Студенти без активності</TextBody>
          </CourseCard>
        </BasicBlock>
      )}

      <BasicBlock $gap={12} $bgColor="transparent" $direction={'row'}>
        <span className="d-flex flex-column gap-2 align-items-start">
          <TextBody $label>Теми, що потребують уваги</TextBody>
        </span>
        <SimpleTable
          data={weakestTopics.slice(0, 5)}
          columns={topicsProblemTeacherTableCol}
          showHeader
          getRowId={(row) => row.topicId}
        />
      </BasicBlock>
    </>
  );
}
