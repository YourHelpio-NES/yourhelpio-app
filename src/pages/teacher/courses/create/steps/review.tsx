import { useEffect } from 'react';
import { useCourseCreate } from '../../../../../assets/shared/hooks/useCourseCreate';
import { COLORS } from '../../../../../assets/styles/colors';
import { SmallText, TextBody } from '../../../../../assets/styles/typography';
import { BasicBlock } from '../../../../../components/blocks';
import { LabelValue } from '../../../../../components/topic-details-content';

export default function ReviewStep() {
  const { formData, setStepValid } = useCourseCreate();

  useEffect(() => {
    setStepValid(3, true);
  }, [setStepValid]);

  return (
    <BasicBlock $gap={16}>
      <BasicBlock $gap={8}>
        <TextBody $label>Основна інформація:</TextBody>
        <LabelValue label="Назва:">
          <TextBody $medium>{formData.title}</TextBody>
        </LabelValue>
        <LabelValue label="Опис:">
          <TextBody $medium>{formData.description}</TextBody>
        </LabelValue>
      </BasicBlock>
      <BasicBlock $gap={8} className="py-3">
        <TextBody $label>Теми:</TextBody>
        <SmallText>
          Після створення AI автоматично згенерує опис, складність і ключові поняття для кожної теми
        </SmallText>

        {formData.topicIds!.map((item, index) => (
          <TextBody key={item.name} $medium>
            {index + 1}. {item.name}
          </TextBody>
        ))}
      </BasicBlock>
      <TextBody $color={COLORS.secondary}>
        Код запрошення для студентів буде згенеровано автоматично після натискання "Створити курс"
      </TextBody>
    </BasicBlock>
  );
}
