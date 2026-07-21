import type { ColumnDef } from '@tanstack/react-table';
import { TextBody } from '../../../styles/typography';
import RadioButton from '../../../../components/radio';
import type { ReviewItem } from '../../../../api/dashboard/dashboard.types';
import { StudyDayEnum, studyDayLabels } from '../../constants/topicDays';
import { dotsTextStyle } from '../../../../components/progress-card';

export const getTaskTableCols = (
  onTopicClick: (id: number) => void,
  onCourseClick: (id: number) => void
): ColumnDef<ReviewItem>[] => [
  {
    accessorKey: 'stage',
    cell: ({ row }) => <RadioButton value={!row.original.is_overdue} type="state" />,
  },
  {
    accessorKey: 'name',
    cell: ({ row }) => (
      <TextBody $medium onClick={() => onTopicClick(row.original.topic_id)}>
        {row.original.topic_title}
      </TextBody>
    ),
  },
  {
    accessorKey: 'course_name',
    cell: ({ row }) => (
      <TextBody style={dotsTextStyle} onClick={() => onCourseClick(row.original.course_id)}>
        {row.original.course_title}
      </TextBody>
    ),
  },
  {
    accessorKey: 'day',
    cell: ({ row }) => <TextBody>{studyDayLabels[row.original.stage as StudyDayEnum]}</TextBody>,
  },
];
