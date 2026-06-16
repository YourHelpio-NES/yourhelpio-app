import { useEffect, useState } from 'react';
import TopicTree from '../../components/curriculum-tree';
import AppLayout from '../../components/widgets/app/layout';
import { BREAKPOINTS } from '../../assets/styles/breakpoints';
import { MobileTopicTree } from '../../components/curriculum-tree-mobile';
import { TableBlock } from './dashboard';
import { COLORS } from '../../assets/styles/colors';
import { CardTitle, TextBody } from '../../assets/styles/typography';
import { SimpleTable } from '../../components/table';
import { extremelyRepeating, tasks } from '../../assets/shared/data/courses';
import taskTableCols from '../../assets/shared/utils/table/task-table-column';
import { Controller } from 'react-hook-form';
import { useFilterForm } from '../../assets/shared/hooks/validators/useFilterDropdown';
import { Select } from '../../components/dropdown';
import { LabelValue } from '../../components/topic-details-content';
import { getColorByPercentage } from '../../assets/shared/utils/color';

export default function CurriculumTreeMainPage() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < BREAKPOINTS.sm);

  const { form } = useFilterForm(extremelyRepeating[0].id.toString());
  const {
    control,
    formState: { errors },
  } = form;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < BREAKPOINTS.sm);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <AppLayout>
      <span className="w-100 d-flex flex-md-nowrap flex-wrap flex-wrap align-items-center gap-2">
        <span className="w-100 d-flex align-items-center gap-3">
          <TextBody $medium>Курс:</TextBody>
          <Controller
            name="item"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value}
                onChange={(val) => {
                  field.onChange(val);
                  field.onBlur();
                }}
                options={extremelyRepeating.map((item) => {
                  return {
                    label: item.course,
                    value: item.id.toString(),
                  };
                })}
                errorText={
                  extremelyRepeating.length === 0
                    ? 'Немає доступних елементів'
                    : errors.item?.message
                }
              />
            )}
          />
        </span>
        <LabelValue label="Прогрес курсу:">
          <TextBody $medium $color={getColorByPercentage(30)}>
            30%
          </TextBody>
          <TextBody>пройдено</TextBody>
        </LabelValue>
      </span>
      {!isMobile && <TopicTree />}
      {isMobile && <MobileTopicTree />}
      <TableBlock $bgColor={COLORS.lighterBg} $titleColor={COLORS.primary} $gap={24}>
        <CardTitle>Аналіз проблемних результатів навчання</CardTitle>

        <SimpleTable data={tasks} columns={taskTableCols} isRowDisabled={(row) => row.completed} />
      </TableBlock>
    </AppLayout>
  );
}
