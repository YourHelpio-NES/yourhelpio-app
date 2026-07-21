import { useEffect, useState } from 'react';
import { PlusIcon } from '../../../../../assets/images/icons/plus-icon';
import { topicsTeacherTableCol } from '../../../../../assets/shared/utils/table/topics-table-column';
import { COLORS } from '../../../../../assets/styles/colors';
import { TextBody } from '../../../../../assets/styles/typography';
import { BasicBlock } from '../../../../../components/blocks';
import { Button } from '../../../../../components/button';
import { SimpleTable } from '../../../../../components/table';
import {
  BodyTable,
  CloseButton,
  DialogContent,
  DialogOverlay,
} from '../../../../student/study-plan';
import * as Dialog from '@radix-ui/react-dialog';
import type { ThemeTableRow } from '../../../../../assets/shared/utils/table/row-type';
import { BREAKPOINTS } from '../../../../../assets/styles/breakpoints';
import { TopicTeacherLargeDetailsContent } from '../../../../../components/topic-details-content';
import { CloseIcon } from '../../../../../assets/images/icons/close-icon';
import { TOPIC_DETAILS_TEACHER } from '../../../../../assets/shared/data/topics-teacher-data';
import type {
  TopicDetailTeacher,
  TopicDetailTeacherRow,
} from '../../../../../assets/shared/constants/details-course';
import { useNavigate } from 'react-router-dom';

export default function TopicsDetailsCourseTab() {
  const [activeRow, setActiveRow] = useState<TopicDetailTeacher>(TOPIC_DETAILS_TEACHER[0]);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= BREAKPOINTS.ml);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= BREAKPOINTS.ml);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleRowClick = (row: ThemeTableRow) => {
    setActiveRow(TOPIC_DETAILS_TEACHER.find((x) => x.id === row.id) ?? TOPIC_DETAILS_TEACHER[0]);
    if (isMobile) setIsModalOpen(true);
  };

  return (
    <>
      <Button $type={'large'} $bgColor={COLORS.lighterBg} $txtColor={COLORS.accent} $brWidth="2">
        <PlusIcon color={COLORS.accent} />
        <TextBody $medium>Додати тему</TextBody>
      </Button>

      <BodyTable $bgColor={COLORS.lighterBg}>
        <BasicBlock $bgColor={COLORS.lighterBg}>
          <SimpleTable
            data={TOPIC_DETAILS_TEACHER.map(
              (item): TopicDetailTeacherRow => ({
                id: item.id,
                topicName: item.topicName,
                status: item.status,
              })
            )}
            columns={topicsTeacherTableCol}
            showHeader={false}
            meta={{
              onEdit: (row) => console.log(`/topics/${row.id}/edit`),
              onDelete: (row) => console.log(row.id),
            }}
            getRowId={(row) => Number.parseInt(row.id)}
            activeRowId={Number.parseInt(activeRow.id)}
            onRowClick={handleRowClick}
          />
        </BasicBlock>
        {!isMobile && (
          <TopicTeacherLargeDetailsContent
            activeRow={activeRow}
            clickNavigate={() =>
              navigate(`/teacher/courses/details/topics/details?id=${activeRow.id}`)
            }
            clickNavigateEdit={() =>
              navigate(`/teacher/courses/details/topics/update?id=${activeRow.id}`)
            }
          />
        )}

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
                <TopicTeacherLargeDetailsContent
                  activeRow={activeRow}
                  clickNavigate={() =>
                    navigate(`/teacher/courses/details/topics/details?id=${activeRow.id}`)
                  }
                  clickNavigateEdit={() =>
                    navigate(`/teacher/courses/details/topics/update?id=${activeRow.id}`)
                  }
                />
              </DialogContent>
            </Dialog.Portal>
          </Dialog.Root>
        )}
      </BodyTable>
    </>
  );
}
