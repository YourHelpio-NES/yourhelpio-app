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
import { topicProblemMockData } from '../../../../assets/shared/data/topic-students';

export default function AnalyticsDetailsCourseTab() {
  return (
    <>
      <BasicBlock
        $direction={'row'}
        $gap={16}
        className="align-items-start justify-content-between flex-lg-row flex-sm-column flex-column"
        $bgColor={COLORS.lighterBg}
      >
        <span className="d-flex flex-column gap-md-2 gap-2 align-items-start">
          <CardTitle>Аналітика курсу</CardTitle>
          <TextBody>Огляд прогресу студентів та ефективності навчання</TextBody>
          <span className="d-flex flex-column mt-3 gap-md-2 gap-2 align-items-start">
            <TextBody $label>Загальна статистика</TextBody>
            <TextBody>Ключові показники навчання по курсу</TextBody>
          </span>
        </span>
        <TableBlock
          width={'30%'}
          style={{ maxHeight: '100%' }}
          className="h-100"
          $gap={16}
          $bgColor={COLORS.lighterBg}
          $brColor={COLORS.secondary}
          $titleColor={COLORS.primary}
        >
          <span className="d-flex gap-1 align-items-center">
            <img src={graphIcon} alt="graph-grow-icon" width={28} height={28} />
            <TextBody $medium>Середній прогрес</TextBody>
            <CardTitle className="ms-auto" style={{ color: COLORS.primary }}>
              68%
            </CardTitle>
          </span>
          <ProgressBar value={68} deltaPositive={true} showPercent={false} />
        </TableBlock>
      </BasicBlock>
      <BasicBlock $gap={12} className="flex-wrap" $bgColor={'transparent'} $direction={'row'}>
        <CourseCard className="gap-2 justify-content-start border">
          <span className="d-flex justify-content-between">
            <StudentStatusButton status={StudentStatusEnum.IN_PROGRESS} width="auto" />
            <TextBody $medium>50%</TextBody>
          </span>
          <TextBody>Студенти, які активно проходять курс</TextBody>
        </CourseCard>
        <CourseCard className="gap-2 justify-content-start border">
          <span className="d-flex justify-content-between">
            <StudentStatusButton status={StudentStatusEnum.COMPLETED} width="auto" />
            <TextBody $medium>30%</TextBody>
          </span>
          <TextBody>Частка студентів, які повністю завершили курс</TextBody>
        </CourseCard>
        <CourseCard className="gap-2 justify-content-start border">
          <span className="d-flex justify-content-between">
            <StudentStatusButton status={StudentStatusEnum.NOT_ASSIGNED} width="auto" />
            <TextBody $medium>2%</TextBody>
          </span>
          <TextBody>Студенти, які не приєднались до курсу</TextBody>
        </CourseCard>
        <CourseCard className="gap-2 justify-content-start border">
          <span className="d-flex justify-content-between">
            <StudentStatusButton status={StudentStatusEnum.NOT_STARTED} width="auto" />
            <TextBody $medium>28%</TextBody>
          </span>
          <TextBody>Студенти без активності або з низьким рівнем засвоєння</TextBody>
        </CourseCard>
      </BasicBlock>
      <BasicBlock $gap={12} className="flex-wrap" $bgColor={'transparent'} $direction={'row'}>
        <span className="d-flex flex-column gap-md-2 gap-2 align-items-start">
          <TextBody $label>Теми, що потребують уваги</TextBody>
          <TextBody>Теми з найнижчим рівнем засвоєння серед студентів</TextBody>
        </span>

        <BasicBlock
          $gap={16}
          className="align-items-end flex-lg-nowrap flex-md-wrap flex-wrap"
          $bgColor={'transparent'}
          $direction={'row'}
        >
          <SimpleTable
            data={topicProblemMockData}
            columns={topicsProblemTeacherTableCol}
            showHeader={true}
            getRowId={(row) => row.id}
          />
          <TextBody>Рівень засвоєння показує, наскільки успішно студенти опанували тему</TextBody>
        </BasicBlock>
      </BasicBlock>
    </>
  );
}
