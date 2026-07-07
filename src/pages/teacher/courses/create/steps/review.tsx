import { useEffect } from 'react';
import { useCourseCreate } from '../../../../../assets/shared/hooks/useCourseCreate';
import { COLORS } from '../../../../../assets/styles/colors';
import { SmallText, TextBody } from '../../../../../assets/styles/typography';
import { BasicBlock } from '../../../../../components/blocks';
import { Chip } from '../../../../../components/multi-dropdown';
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
        <LabelValue label="Студенти, які будуть додані до курсу:">
          <span className="d-flex align-items-center gap-1">
            {formData.studentIds!.map((item) => (
              <Chip key={item}>
                <TextBody $color={COLORS.text}>{item}</TextBody>
              </Chip>
            ))}
          </span>
        </LabelValue>
      </BasicBlock>
      <BasicBlock $gap={8} className="py-3">
        <TextBody $label>Теми:</TextBody>
        <SmallText>*Ви зможете редагувати теми після створення курсу</SmallText>

        {formData.topicIds!.map((item, index) => (
          <span key={item.name} className="d-flex align-items-center justify-content-between gap-3">
            <span className="d-flex flex-column gap-1">
              <TextBody $medium>
                {index + 1}. {item.name}
              </TextBody>
              <TextBody>{item.description}</TextBody>
            </span>
          </span>
        ))}
      </BasicBlock>
    </BasicBlock>
  );
}
