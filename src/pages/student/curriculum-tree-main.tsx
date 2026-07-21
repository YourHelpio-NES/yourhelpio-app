import { useEffect, useMemo, useState } from 'react';
import TopicTree from '../../components/curriculum-tree';
import AppLayout from '../../components/widgets/app/layout';
import { BREAKPOINTS } from '../../assets/styles/breakpoints';
import { MobileTopicTree } from '../../components/curriculum-tree-mobile';
import { TableBlock } from './dashboard';
import { COLORS } from '../../assets/styles/colors';
import { CardTitle, TextBody } from '../../assets/styles/typography';
import { Controller } from 'react-hook-form';
import { useFilterForm } from '../../assets/shared/hooks/validators/useFilterDropdown';
import { Select } from '../../components/dropdown';
import { LabelValue } from '../../components/topic-details-content';
import { getColorByPercentage } from '../../assets/shared/utils/color';
import { useCourseDetailsStudent } from '../../assets/shared/hooks/useCourseDetailsStudent';
import { useEnrolledCourses } from '../../assets/shared/hooks/useEnrolledCourses';
import { useSearchParams } from 'react-router-dom';

export default function CurriculumTreeMainPage() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < BREAKPOINTS.sm);

  const { course, fetchCourse, isLoading: courseLoading } = useCourseDetailsStudent();
  const { courses, isLoading: coursesLoading } = useEnrolledCourses();

  const [searchParams, setSearchParams] = useSearchParams();
  const id = useMemo(() => {
    const courseId = searchParams.get('course');

    if (courseId) {
      return Number(courseId);
    }

    return courses.length ? courses[0].id : undefined;
  }, [searchParams, courses]);

  const { form } = useFilterForm(id?.toString() ?? '');
  const {
    control,
    setValue,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (!searchParams.get('course') && courses.length) {
      setSearchParams({
        course: courses[0].id.toString(),
      });
    }
  }, [courses, searchParams, setSearchParams]);

  useEffect(() => {
    if (id) {
      void fetchCourse(id);
    }
  }, [id, fetchCourse]);

  useEffect(() => {
    if (id) {
      setValue('item', id.toString());
    }
  }, [id, setValue]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < BREAKPOINTS.sm);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <AppLayout loadingState={courseLoading || coursesLoading}>
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

                  setSearchParams((prev) => {
                    const params = new URLSearchParams(prev);

                    if (val) {
                      params.set('course', val);
                    } else {
                      params.delete('course');
                    }

                    return params;
                  });
                }}
                options={courses.map((item) => {
                  return {
                    label: item.title,
                    value: item.id.toString(),
                  };
                })}
                errorText={
                  courses.length === 0 ? 'Немає доступних елементів' : errors.item?.message
                }
              />
            )}
          />
        </span>
        <LabelValue label="Прогрес курсу:">
          <TextBody
            $medium
            $color={getColorByPercentage(course?.certificate_progress.completion_pct ?? 0)}
          >
            {course?.certificate_progress.completion_pct}%
          </TextBody>
          <TextBody>пройдено</TextBody>
          <TextBody $medium>
            {course?.certificate_progress.completed_topics}/
            {course?.certificate_progress.total_topics}
          </TextBody>
        </LabelValue>
      </span>
      {!course ? (
        <TextBody>Курс невдалось завантажити</TextBody>
      ) : !isMobile ? (
        <TopicTree
          course={course}
          courseTitle={courses.find((x) => x.id === course.course_id)?.title ?? ''}
        />
      ) : (
        isMobile && (
          <MobileTopicTree
            course={course}
            courseTitle={courses.find((x) => x.id === course.course_id)?.title ?? ''}
          />
        )
      )}
      <TableBlock $bgColor={COLORS.lighterBg} $titleColor={COLORS.primary} $gap={24}>
        <CardTitle>Аналіз проблемних результатів навчання</CardTitle>

        {/* <SimpleTable data={tasks} columns={taskTableCols} isRowDisabled={(row) => row.completed} /> */}
      </TableBlock>
    </AppLayout>
  );
}
