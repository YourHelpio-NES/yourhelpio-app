import { useEffect, useState } from 'react';
import { PlusIcon } from '../../../../../assets/images/icons/plus-icon';
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
import { BREAKPOINTS } from '../../../../../assets/styles/breakpoints';
import { TopicTeacherLargeDetailsContent } from '../../../../../components/topic-details-content';
import { CloseIcon } from '../../../../../assets/images/icons/close-icon';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useCourseTopicsList } from '../../../../../assets/shared/hooks/useCourseTopicsList';
import { topicsTableColumns } from '../../../../../assets/shared/utils/table/topics-table-column';
import showToast from '../../../../../components/toast/show';
import { ToastTypeEnum } from '../../../../../assets/shared/constants/custom-toast';
import { coursesApi } from '../../../../../api/courses/courses.api';
import { getErrorMessage } from '../../../../../assets/shared/utils/getErrorMessage';
import ModalWindow from '../../../../../components/modal-window';
import Input from '../../../../../components/input';
import { InputTypeEnum } from '../../../../../assets/shared/constants/input';

export default function TopicsDetailsCourseTab() {
  const courseId = useOutletContext<number>();
  const { topics, isLoading, refetch } = useCourseTopicsList(courseId);

  const [activeRowId, setActiveRowId] = useState<number | null>(null);

  const activeRow = topics.find((topic) => topic.id === activeRowId) ?? topics[0] ?? null;

  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= BREAKPOINTS.ml);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newTopicName, setNewTopicName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= BREAKPOINTS.ml);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCreateTopic = async () => {
    if (!newTopicName.trim()) return;
    setIsCreating(true);
    try {
      const { data: newTopic } = await coursesApi.createTopic(courseId, {
        title: newTopicName,
      });
      showToast(
        ToastTypeEnum.SUCCESS,
        'Готово',
        'Тему додано, AI формує її опис у фоновому режимі'
      );
      setIsCreateOpen(false);
      setNewTopicName('');
      await refetch();
      setActiveRowId(newTopic.id);
    } catch (err: unknown) {
      showToast(ToastTypeEnum.ERROR, 'Помилка', getErrorMessage(err, 'Не вдалося створити тему'));
    } finally {
      setIsCreating(false);
    }
  };

  if (isLoading) return <TextBody>Завантаження...</TextBody>;

  return (
    <>
      <Button
        $type={'large'}
        $bgColor={COLORS.lighterBg}
        $txtColor={COLORS.accent}
        $brWidth="2"
        onClick={() => setIsCreateOpen(true)}
      >
        <PlusIcon color={COLORS.accent} />
        <TextBody $medium>Додати тему</TextBody>
      </Button>

      {topics.length === 0 ? (
        <TextBody>У цьому курсі ще немає тем</TextBody>
      ) : (
        <BodyTable $bgColor={COLORS.lighterBg}>
          <BasicBlock $bgColor={COLORS.lighterBg}>
            <SimpleTable
              data={topics}
              columns={topicsTableColumns}
              getRowId={(row) => row.id}
              activeRowId={activeRow?.id}
              onRowClick={(row) => {
                setActiveRowId(row.id);
              }}
            />
          </BasicBlock>
          {!isMobile && activeRow && (
            <TopicTeacherLargeDetailsContent
              activeRow={activeRow}
              clickNavigate={() =>
                navigate(`/teacher/courses/${courseId}/topics/details?id=${activeRow.id}`)
              }
              clickNavigateEdit={() =>
                navigate(`/teacher/courses/${courseId}/topics/update?id=${activeRow.id}`)
              }
            />
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
                  <TopicTeacherLargeDetailsContent
                    activeRow={activeRow}
                    clickNavigate={() =>
                      navigate(`/teacher/courses/${courseId}/topics/details?id=${activeRow.id}`)
                    }
                    clickNavigateEdit={() =>
                      navigate(`/teacher/courses/${courseId}/topics/update?id=${activeRow.id}`)
                    }
                  />
                </DialogContent>
              </Dialog.Portal>
            </Dialog.Root>
          )}
        </BodyTable>
      )}
      <ModalWindow
        isOpen={isCreateOpen}
        onClose={() => {
          setIsCreateOpen(false);
          setNewTopicName('');
        }}
        title="Додати тему"
        size="lg"
        footer={
          <Button
            $type="large"
            disabled={!newTopicName.trim() || isCreating}
            onClick={handleCreateTopic}
          >
            <TextBody $medium>{isCreating ? 'Створюємо...' : 'Створити'}</TextBody>
          </Button>
        }
      >
        <span className="d-flex flex-column gap-3">
          <TextBody>Вкажіть назву для нової навчальної теми</TextBody>
          <Input
            value={newTopicName}
            setValue={setNewTopicName}
            type={InputTypeEnum.TEXT}
            placeholder="Наприклад: Сортування масивів"
            label="Назва *"
          />
          <TextBody $color={COLORS.secondary}>
            Після створення AI автоматично сформує опис, ключові терміни та результати навчання на
            основі матеріалів курсу
          </TextBody>
        </span>
      </ModalWindow>
    </>
  );
}
