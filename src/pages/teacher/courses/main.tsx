import styled from 'styled-components';
import { BlocksElementIcon } from '../../../assets/images/icons/blocks-element-icon';
import { PlusIcon } from '../../../assets/images/icons/plus-icon';
import { COLORS } from '../../../assets/styles/colors';
import { SmallText, TextBody } from '../../../assets/styles/typography';
import { Button } from '../../../components/button';
import AppLayout from '../../../components/widgets/app/layout';
import { TableBlock } from '../../student/dashboard';
import { useEffect, useState } from 'react';
import { BREAKPOINTS, media } from '../../../assets/styles/breakpoints';
import { BodyTable, CloseButton, DialogContent, DialogOverlay } from '../../student/study-plan';
import { BasicBlock } from '../../../components/blocks';
import { SimpleTable } from '../../../components/table';
import { TopicTeacherSmallDetailsContent } from '../../../components/topic-details-content';
import * as Dialog from '@radix-ui/react-dialog';
import { CloseIcon } from '../../../assets/images/icons/close-icon';
import { weakTopicTeacherColumns } from '../../../assets/shared/utils/table/weak-topic-teacher-column';
import { useNavigate } from 'react-router-dom';
import { ProgressCard } from '../../../components/progress-card';
import { useTeacherCoursesWithStats } from '../../../assets/shared/hooks/useTeacherCoursesWithStats';
import {
  useTeacherWeakTopics,
  type WeakTopicRow,
} from '../../../assets/shared/hooks/useTeacherWeakTopics';
import { useTopicSummary } from '../../../assets/shared/hooks/useTopicDetails';

export default function MainCoursesPageTeacher() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= BREAKPOINTS.ml);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const { courses, isLoading: coursesLoading } = useTeacherCoursesWithStats();
  const { rows: weakTopics, isLoading: topicsLoading } = useTeacherWeakTopics(courses);
  const { summary, fetchSummary } = useTopicSummary();
  const [activeRowId, setActiveRowId] = useState<number | null>(null);

  const activeRow = weakTopics.find((topic) => topic.id === activeRowId) ?? weakTopics[0] ?? null;
  console.log(courses);
  console.log(courses);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= BREAKPOINTS.ml);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleRowClick = (row: WeakTopicRow) => {
    setActiveRowId(row.id);
    fetchSummary(row.id);

    if (isMobile) {
      setIsModalOpen(true);
    }
  };

  return (
    <AppLayout loadingState={topicsLoading || coursesLoading}>
      <BasicBlock className="align-items-start" $gap={24}>
        <Button
          $type={'large'}
          $bgColor={COLORS.background}
          $txtColor={COLORS.accent}
          $brWidth="2"
          onClick={() => navigate('/teacher/courses/create')}
        >
          <PlusIcon color={COLORS.accent} />
          <TextBody $medium>Додати курс</TextBody>
        </Button>

        {courses.length === 0 ? (
          <TextBody>У вас ще немає створених курсів</TextBody>
        ) : (
          <TableBlock
            $titleColor={COLORS.accent}
            $bgColor={'transparent'}
            $brColor={COLORS.secondary}
            $gap={12}
            className="flex-wrap justify-content-start"
            $direction={'row'}
          >
            {courses.map((item) => (
              <CourseCard
                key={item.id}
                onClick={() => navigate(`/teacher/courses/${item.id}/overview`)}
              >
                <span className="flex-nowrap">
                  <BlocksElementIcon />
                  <TextBody $label>{item.title}</TextBody>
                </span>
                <span>
                  <SmallText>Кількість тем:</SmallText>
                  <TextBody $label>{item.topicsCount}</TextBody>
                </span>
                <span>
                  <SmallText>Студентів на курсі:</SmallText>
                  <TextBody $label>{item.studentsCount}</TextBody>
                </span>
                <span>
                  <SmallText>Дата створення:</SmallText>
                  <TextBody $label>
                    {new Date(item.created_at).toLocaleDateString('uk-UA')}
                  </TextBody>
                </span>
              </CourseCard>
            ))}
          </TableBlock>
        )}

        {weakTopics.length > 0 && (
          <BodyTable>
            <BasicBlock className="flex-grow-1">
              <SimpleTable
                data={weakTopics}
                columns={weakTopicTeacherColumns}
                getRowId={(row) => row.id}
                activeRowId={activeRow?.id}
                onRowClick={handleRowClick}
              />
            </BasicBlock>
            {!isMobile && activeRow && (
              <TopicTeacherSmallDetailsContent activeRow={activeRow} summary={summary} />
            )}
            {isMobile && activeRow && (
              <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
                <Dialog.Portal>
                  <DialogOverlay />
                  <DialogContent>
                    <Dialog.Close asChild>
                      <CloseButton>
                        <CloseIcon size={22} />
                      </CloseButton>
                    </Dialog.Close>
                    <TopicTeacherSmallDetailsContent activeRow={activeRow} summary={summary} />
                  </DialogContent>
                </Dialog.Portal>
              </Dialog.Root>
            )}
          </BodyTable>
        )}
      </BasicBlock>
    </AppLayout>
  );
}

export const CourseCard = styled(ProgressCard)`
  flex: 0 1 calc(33% - 8px);
  max-width: calc(33% - 8px);

  ${media(BREAKPOINTS.ml)} {
    flex: 0 1 calc(50% - 8px);
    max-width: calc(50% - 8px);
  }

  ${media(630)} {
    flex: 0 1 100%;
    max-width: 100%;
  }
`;
