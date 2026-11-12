import { useEffect, useState } from 'react';
import { PlusIcon } from '../../../../../assets/images/icons/plus-icon';
import { COLORS } from '../../../../../assets/styles/colors';
import { SmallText, TextBody } from '../../../../../assets/styles/typography';
import { BasicBlock } from '../../../../../components/blocks';
import { Button } from '../../../../../components/button';
import ModalWindow from '../../../../../components/modal-window';
import Input from '../../../../../components/input';
import { InputTypeEnum } from '../../../../../assets/shared/constants/input';
import { useCourseCreate } from '../../../../../assets/shared/hooks/useCourseCreate';

export default function TopicsStep() {
  const { formData, updateForm, setStepValid } = useCourseCreate();

  const [topics, setTopics] = useState(formData.topicIds ?? []);
  const [isOpen, setIsOpen] = useState(false);
  const [newTopicName, setNewTopicName] = useState('');

  useEffect(() => {
    updateForm({ topicIds: topics });
    setStepValid(1, topics.length > 0);
  }, [setStepValid, topics, updateForm]);

  const handleAdd = () => {
    setTopics((prev) => [...prev, { name: newTopicName, description: '' }]);
    setIsOpen(false);
    setNewTopicName('');
  };
  const handleRemove = (index: number) => {
    setTopics((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <BasicBlock className="align-items-start">
      <span className="d-flex gap-3 flex-wrap align-items-center">
        <Button
          $type={'large'}
          $bgColor={'transparent'}
          $txtColor={COLORS.accent}
          $brWidth="2"
          onClick={() => setIsOpen(true)}
        >
          <PlusIcon color={COLORS.accent} />
          <TextBody $medium>Додати тему</TextBody>
        </Button>
        <TextBody>
          *Вкажіть лише назву — після створення курсу AI автоматично проаналізує матеріали й
          згенерує опис, складність та ключові поняття теми
        </TextBody>
      </span>
      {topics.length === 0 ? (
        <TextBody>Тут будуть відображатись додані вами теми</TextBody>
      ) : (
        <BasicBlock className="py-3">
          {topics.map((item, index) => (
            <span
              key={item.name}
              className="d-flex align-items-center justify-content-between gap-3"
            >
              <TextBody $medium>
                {index + 1}. {item.name}
              </TextBody>
              <Button
                $bgColor={'transparent'}
                $txtColor={COLORS.status.error}
                $brColor={COLORS.status.error}
                $brWidth="2"
                width="auto"
                $type={'small'}
                onClick={() => handleRemove(index)}
              >
                <SmallText $medium>Видалити</SmallText>
              </Button>
            </span>
          ))}
        </BasicBlock>
      )}
      <ModalWindow
        isOpen={!!isOpen}
        onClose={() => {
          setIsOpen(false);
          setNewTopicName('');
        }}
        title="Додати тему"
        size="lg"
        footer={
          <Button $type="large" disabled={!newTopicName} onClick={handleAdd}>
            <TextBody $medium>Створити</TextBody>
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
        </span>
      </ModalWindow>
    </BasicBlock>
  );
}
