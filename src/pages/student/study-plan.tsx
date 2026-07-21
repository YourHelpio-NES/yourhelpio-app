import { useEffect, useMemo, useState } from 'react';
import { Select } from '../../components/dropdown';
import AppLayout from '../../components/widgets/app/layout';
import { Controller } from 'react-hook-form';
import { useFilterForm } from '../../assets/shared/hooks/validators/useFilterDropdown';
import { BasicBlock, basicShadow } from '../../components/blocks';
import { TextBody } from '../../assets/styles/typography';
import { getColorByPercentage } from '../../assets/shared/utils/color';
import { SimpleTable } from '../../components/table';
import { TableBlock } from './dashboard';
import { COLORS } from '../../assets/styles/colors';
import { StatusItem } from '../../components/status-items';
import styled from 'styled-components';
import { BREAKPOINTS, media } from '../../assets/styles/breakpoints';
import * as Dialog from '@radix-ui/react-dialog';
import { CloseIcon } from '../../assets/images/icons/close-icon';
import TopicDetailsContent, { LabelValue } from '../../components/topic-details-content';
import topicsTableCols from '../../assets/shared/utils/table/topics-table-column';
import { useCourseDetailsStudent } from '../../assets/shared/hooks/useCourseDetailsStudent';
import { useSearchParams } from 'react-router-dom';
import { useEnrolledCourses } from '../../assets/shared/hooks/useEnrolledCourses';
import type { CourseTopicProgress } from '../../api/courses/details.types';

export default function StudyPlanMainPage() {
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

  const [activeRowId, setActiveRowId] = useState<number>();
  const activeRow = useMemo(() => {
    if (!course) return undefined;

    return course.topics.find((x) => x.topic_id === activeRowId) ?? course.topics[0];
  }, [course, activeRowId]);

  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= BREAKPOINTS.ml);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= BREAKPOINTS.ml);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleRowClick = (row: CourseTopicProgress) => {
    setActiveRowId(
      (course?.topics.find((x) => x.topic_id === row.topic_id) ?? course?.topics[0])?.topic_id
    );
    if (isMobile) setIsModalOpen(true);
  };

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

  if (!course) {
    return (
      <AppLayout>
        <TextBody>курс не знайдено.</TextBody>
      </AppLayout>
    );
  }

  return (
    <AppLayout loadingState={courseLoading || coursesLoading}>
      <BasicBlock width="55%">
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
        <LabelValue label="Тривалість курсу:">
          <TextBody>{course?.certificate_progress.total_topics} тем</TextBody>
        </LabelValue>
      </BasicBlock>

      <BodyTable>
        <BasicBlock>
          <SimpleTable
            data={course?.topics}
            columns={topicsTableCols}
            showHeader
            getRowId={(row) => row.topic_id}
            activeRowId={activeRowId}
            onRowClick={handleRowClick}
          />
        </BasicBlock>
        {!isMobile && <TopicDetailsContent activeRow={activeRow} />}

        {isMobile && (
          <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
            <Dialog.Portal>
              <DialogOverlay />
              <DialogContent>
                <Dialog.Close asChild>
                  <CloseButton>
                    <CloseIcon size={22} />
                  </CloseButton>
                </Dialog.Close>
                <TopicDetailsContent activeRow={activeRow} />
              </DialogContent>
            </Dialog.Portal>
          </Dialog.Root>
        )}
      </BodyTable>
    </AppLayout>
  );
}

export const BodyTable = styled(BasicBlock)`
  gap: 60px;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;

  ${StatusItem} {
    margin-top: 1px;
  }

  svg {
    flex-shrink: 0;
  }

  & > * {
    width: 45%;
  }

  ${media(BREAKPOINTS.lg)} {
    gap: 44px;
    & > * {
      width: 47%;
      transition:
        width 0.25s cubic-bezier(0.22, 1, 0.36, 1),
        transform 0.25s ease;
    }
  }

  ${media(BREAKPOINTS.ml)} {
    gap: 36px;
  }

  ${media(BREAKPOINTS.ml)} {
    flex-direction: column;
    gap: 24px;
    & > * {
      width: 100%;
    }
  }
`;

export const DialogOverlay = styled(Dialog.Overlay)`
  position: fixed;
  inset: 0;
  backdrop-filter: blur(1px);
  background: rgba(0, 0, 0, 0.18);
  z-index: 100;
`;

export const DialogContent = styled(Dialog.Content)`
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 101;
  background: ${COLORS.background};
  border-radius: 20px 20px 0 0;
  padding: 16px;
  width: 50%;
  max-height: 85vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
  scrollbar-width: thin;

  transition:
    width 0.25s cubic-bezier(0.22, 1, 0.36, 1),
    max-height 0.25s ease,
    border-radius 0.25s ease;

  will-change: width, transform;

  ${media(BREAKPOINTS.md)} {
    width: 60%;
  }

  ${media(BREAKPOINTS.sm)} {
    width: 70%;
  }

  @media (max-width: 650px) {
    width: 75%;
  }

  ${media(BREAKPOINTS.xs)} {
    width: 100%;
    max-height: 60vh;
  }

  ${TableBlock} {
    overflow-y: auto;
    scrollbar-width: thin;
    gap: 16px;

    svg {
      flex-shrink: 0;
    }

    ${StatusItem} {
      width: 18px;
      height: 18px;
      margin-top: 3px;
    }
  }

  ${BasicBlock} {
    gap: 12px;
  }

  &[data-state='open'] {
    animation: slideUp 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  }
  &[data-state='closed'] {
    animation: slideDown 0.2s ease-in;
  }

  @keyframes slideUp {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
  @keyframes slideDown {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(100%);
    }
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 7px;
  left: 7px;
  background: ${COLORS.lighterBg};
  border: none;
  cursor: pointer;
  padding: 2px;
  margin: 0;
  outline: none;
  border-radius: 8px;
  svg {
    vertical-align: text-top;
  }

  ${basicShadow};
`;
