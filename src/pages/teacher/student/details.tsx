import { useSearchParams } from 'react-router-dom';
import { BasicBlock } from '../../../components/blocks';
import AppLayout from '../../../components/widgets/app/layout';
import { studentsMock } from '../../../assets/shared/data/students';
import { CardTitle, SmallText, TextBody } from '../../../assets/styles/typography';
import { StudentCardIcon } from '../../../assets/images/icons/student-card-icon';
import { EmailCell } from '../../../assets/shared/utils/table/student';
import { TableBlock } from '../../student/dashboard';
import { COLORS } from '../../../assets/styles/colors';
import { coursesProgressData } from '../../../assets/shared/data/courses';
import { CourseCard } from '../courses/main';
import { BlocksElementIcon } from '../../../assets/images/icons/blocks-element-icon';
import { StudentStatusButton } from '../../../components/row-table-action';
import { StudentStatusEnum } from '../../../assets/shared/constants/student';

export default function DetailsStudentsPage() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const activeRow = studentsMock[Number.parseInt(id ?? '1') - 1];

  return (
    <AppLayout>
      <BasicBlock $gap={12}>
        <span className="d-flex gap-3 align-items-center">
          <StudentCardIcon />
          <CardTitle>{activeRow.fullName}</CardTitle>
          <TextBody>{activeRow.group}</TextBody>
        </span>
        <EmailCell email={activeRow.email} />
      </BasicBlock>
      <TextBody $medium> Курси до яких приєднано студента</TextBody>
      <BasicBlock $bgColor={'transparent'} $gap={12} className="flex-wrap" $direction={'row'}>
        {coursesProgressData.map((item) => (
          <CourseCard key={JSON.stringify(item)}>
            <span className="flex-nowrap">
              <BlocksElementIcon />
              <TextBody $label>{item.title}</TextBody>
            </span>
            <span>
              <SmallText>Прогрес:</SmallText>
              <TextBody className="me-auto" $label>
                {70 + Number.parseInt(`${item.id}0`)}%
              </TextBody>
              <StudentStatusButton status={StudentStatusEnum.IN_PROGRESS} width="auto" />
            </span>
            <span>
              <SmallText>Кількість тем:</SmallText>
              <TextBody $label>{item.totalTopics}</TextBody>
            </span>
            <span>
              <SmallText>Студентів на курсі:</SmallText>
              <TextBody $label>
                {item.id}
                {item.completedTopics}
              </TextBody>
            </span>
          </CourseCard>
        ))}
      </BasicBlock>
      <TableBlock $bgColor={COLORS.lighterBg} $titleColor={COLORS.primary} $gap={16}>
        <TextBody $color={COLORS.primary} $label>
          Аналіз проблемних результатів навчання
        </TextBody>

        {/* <SimpleTable data={tasks} columns={taskTableCols} isRowDisabled={(row) => row.completed} /> */}
      </TableBlock>
    </AppLayout>
  );
}
