import type { ColumnDef } from '@tanstack/react-table';
import { SmallText, TextBody } from '../../../styles/typography';
import { getColorByPercentage } from '../color';
import type { WeakTopic } from '../../constants/course';

export const weakTopicTeacherColumns: ColumnDef<WeakTopic>[] = [
  {
    accessorKey: 'title',
    cell: ({ row }) => <TextBody $medium>{row.original.title}</TextBody>,
    header: 'Тема',
  },
  {
    accessorKey: 'course',
    cell: ({ row }) => <TextBody $medium>{row.original.course}</TextBody>,
    header: 'Курс',
  },
  {
    accessorKey: 'masteryPercent',
    cell: ({ row }) => (
      <span className="d-flex gap-3 align-items-center">
        <TextBody $medium $color={getColorByPercentage(row.original.masteryPercent)}>
          {row.original.masteryPercent}%
        </TextBody>
        {row.original.weeklyDelta && (
          <SmallText>
            {row.original.weeklyDelta.toString().includes('-') ? '↓' : '↑'}{' '}
            {row.original.weeklyDelta}% за тиждень
          </SmallText>
        )}
      </span>
    ),
    header: 'Відсоток проходження',
  },
];
