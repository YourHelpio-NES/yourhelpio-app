import styled from 'styled-components';
import { BlocksElementIcon } from '../../../assets/images/icons/blocks-element-icon';
import { PlusIcon } from '../../../assets/images/icons/plus-icon';
import { coursesProgressData, WEAK_TOPICS } from '../../../assets/shared/data/courses';
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
import type { WeakTopic } from '../../../assets/shared/constants/course';
import { useNavigate } from 'react-router-dom';
import { ProgressCard } from '../../../components/progress-card';

export default function MainCoursesPageTeacher() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= BREAKPOINTS.ml);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeRow, setActiveRow] = useState<WeakTopic>(WEAK_TOPICS[0]);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= BREAKPOINTS.ml);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleRowClick = (row: WeakTopic) => {
    setActiveRow(WEAK_TOPICS.find((x) => x.id === row.id) ?? WEAK_TOPICS[0]);
    if (isMobile) setIsModalOpen(true);
  };

  return (
    <AppLayout>
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
        <TableBlock
          $titleColor={COLORS.accent}
          $bgColor={'transparent'}
          $brColor={COLORS.secondary}
          $gap={12}
          className="flex-wrap"
          $direction={'row'}
        >
          {coursesProgressData.map((item) => (
            <CourseCard key={JSON.stringify(item)}>
              <span className="flex-nowrap">
                <BlocksElementIcon />
                <TextBody $label>{item.title}</TextBody>
              </span>
              <span>
                <SmallText>Кількість тем:</SmallText>
                <TextBody $label>{item.totalTopics}</TextBody>
              </span>
              <span>
                <SmallText>Студентів на курсі:</SmallText>
                <TextBody $label>90</TextBody>
              </span>
              <span>
                <SmallText>Дата створення:</SmallText>
                <TextBody $label>30.03.2026</TextBody>
              </span>
            </CourseCard>
          ))}
        </TableBlock>
        <BodyTable>
          <BasicBlock className="flex-grow-1">
            <SimpleTable
              data={WEAK_TOPICS}
              columns={weakTopicTeacherColumns}
              getRowId={(row) => row.id}
              activeRowId={activeRow.id}
              onRowClick={handleRowClick}
            />
          </BasicBlock>
          {!isMobile && <TopicTeacherSmallDetailsContent activeRow={activeRow} />}

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
                  <TopicTeacherSmallDetailsContent activeRow={activeRow} />
                </DialogContent>
              </Dialog.Portal>
            </Dialog.Root>
          )}
        </BodyTable>
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
