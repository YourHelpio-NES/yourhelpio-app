import { useSearchParams } from 'react-router-dom';
import { COLORS } from '../../../../../assets/styles/colors';
import { BasicBlock } from '../../../../../components/blocks';
import { studentsMock } from '../../../../../assets/shared/data/students';
import { StudentCardIcon } from '../../../../../assets/images/icons/student-card-icon';
import { CardTitle, SmallText, TextBody } from '../../../../../assets/styles/typography';
import { EmailCell } from '../../../../../assets/shared/utils/table/student';
import { StudentStatusButton } from '../../../../../components/row-table-action';
import { StudentStatusEnum } from '../../../../../assets/shared/constants/student';
import { SimpleTable } from '../../../../../components/table';
import {
  coursesProgressData,
  tasks,
  topicsTableData,
} from '../../../../../assets/shared/data/courses';
import topicsTableCols from '../../../../../assets/shared/utils/table/topics-table-column';
import { BodyTable } from '../../../../student/study-plan';
import { TableBlock } from '../../../../student/dashboard';
import { BlocksElementIcon } from '../../../../../assets/images/icons/blocks-element-icon';
import taskTableCols from '../../../../../assets/shared/utils/table/task-table-column';

export default function StudentsDetailsCourseTab() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const activeRow = studentsMock[Number.parseInt(id ?? '1') - 1];

  return (
    <>
      <BasicBlock
        $direction={'column'}
        $gap={12}
        className="align-items-start justify-content-between"
        $bgColor={COLORS.lighterBg}
      >
        <span className="w-100 d-flex gap-3 align-items-center">
          <StudentCardIcon />
          <CardTitle>{activeRow.fullName}</CardTitle>
          <TextBody className="me-auto">{activeRow.group}</TextBody>

          <StudentStatusButton status={StudentStatusEnum.IN_PROGRESS} width="auto" />
        </span>
        <EmailCell email={activeRow.email} />
      </BasicBlock>
      <span className="w-100 d-flex gap-2 align-items-center">
        <TextBody>Загальний прогрес по курсу:</TextBody>
        <TextBody $medium>2 з 9 тем завершено</TextBody>
      </span>
      <BodyTable $bgColor="transparent">
        <BasicBlock $bgColor="transparent">
          <SimpleTable data={topicsTableData} columns={topicsTableCols} showHeader />
        </BasicBlock>
        <TableBlock
          $titleColor={COLORS.accent}
          $bgColor={COLORS.background}
          $brColor={'transparent'}
          $gap={12}
          className="flex-wrap"
          $direction={'column'}
        >
          <TextBody $medium>Інші курси до яких приєднано студента</TextBody>
          {coursesProgressData.slice(1).map((item) => (
            <TableBlock
              className="flex-column gap-1"
              $bgColor={COLORS.lighterBg}
              key={JSON.stringify(item)}
            >
              <span className="d-flex align-items-center gap-2 flex-nowrap">
                <BlocksElementIcon />
                <TextBody $label>{item.title}</TextBody>
              </span>
              <span className="d-flex align-items-center gap-2">
                <SmallText>Прогрес:</SmallText>
                <TextBody className="me-auto" $label>
                  {70 + Number.parseInt(`${item.id}0`)}%
                </TextBody>
                <StudentStatusButton status={StudentStatusEnum.IN_PROGRESS} width="auto" />
              </span>
              <span className="d-flex align-items-center gap-2">
                <SmallText>Кількість тем:</SmallText>
                <TextBody $label>{item.totalTopics}</TextBody>
              </span>
              <span className="d-flex align-items-center gap-2">
                <SmallText>Студентів на курсі:</SmallText>
                <TextBody $label>
                  {item.id}
                  {item.completedTopics}
                </TextBody>
              </span>
            </TableBlock>
          ))}
        </TableBlock>
      </BodyTable>
      <TableBlock $bgColor={COLORS.lighterBg} $titleColor={COLORS.primary} $gap={16}>
        <TextBody $color={COLORS.primary} $label>
          Аналіз проблемних результатів навчання
        </TextBody>

        <SimpleTable data={tasks} columns={taskTableCols} isRowDisabled={(row) => row.completed} />
      </TableBlock>
    </>
  );
}
