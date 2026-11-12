import type { ColumnDef } from '@tanstack/react-table';
import { SmallText, TextBody } from '../../../styles/typography';
import { getColorByPercentage } from '../color';
import type { WeakTopicRow } from '../../hooks/useTeacherWeakTopics';

export const weakTopicTeacherColumns: ColumnDef<WeakTopicRow>[] = [
  {
    accessorKey: 'title',
    cell: ({ row }) => <TextBody $medium>{row.original.title}</TextBody>,
    header: 'Тема',
  },
  {
    accessorKey: 'course',
    cell: ({ row }) => <TextBody $medium>{row.original.courseTitle}</TextBody>,
    header: 'Курс',
  },
  {
    accessorKey: 'masteryPercent',
    cell: ({ row }) => (
      <span className="d-flex gap-3 align-items-center">
        <TextBody $medium $color={getColorByPercentage(row.original.masteryPercent)}>
          {row.original.masteryPercent}%
        </TextBody>
        {row.original.masteryPercent && (
          <SmallText>
            {row.original.masteryPercent.toString().includes('-') ? '↓' : '↑'}{' '}
            {row.original.masteryPercent}% за тиждень
          </SmallText>
        )}
      </span>
    ),
    header: 'Відсоток проходження',
  },
];
