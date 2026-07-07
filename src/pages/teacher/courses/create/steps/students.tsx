import { useEffect, useState } from 'react';
import { SmallText, TextBody } from '../../../../../assets/styles/typography';
import { BasicBlock } from '../../../../../components/blocks';
import { Chip, MultiSelect } from '../../../../../components/multi-dropdown';
import { Button } from '../../../../../components/button';
import { COLORS } from '../../../../../assets/styles/colors';
import { useCourseCreate } from '../../../../../assets/shared/hooks/useCourseCreate';
import ModalWindow from '../../../../../components/modal-window';
import RadioButton from '../../../../../components/radio';
import { RadioBlock } from '../../../../auth/sign-up';
import Input from '../../../../../components/input';
import { InputTypeEnum } from '../../../../../assets/shared/constants/input';
import { Line } from '../../../../../components/status-items';

export default function StudentsStep() {
  const { formData, updateForm, setStepValid } = useCourseCreate();
  const [studentIds, setStudentIds] = useState<string[]>(formData.studentIds ?? []);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isGeneric, setIsGeneric] = useState<boolean>(false);

  const [selectedType, setSelectedType] = useState<string | null>('За посиланням');
  const [studentText, setStudentText] = useState<string>('');
  const [studentEmail, setStudentEmail] = useState<string>('');

  useEffect(() => {
    updateForm({ studentIds });
    setStepValid(2, studentIds.length > 0);
  }, [setStepValid, studentIds, updateForm]);

  return (
    <BasicBlock className="align-items-start">
      <TextBody $label>Оберіть групи, щоб надіслати для них запрошення на курс:</TextBody>
      <span className=" w-100 d-flex gap-2 flex-lg-nowrap flex-md-wrap flex-sm-nowrap flex-nowrap justify-content-between align-items-center">
        {' '}
        <MultiSelect
          options={[
            { value: 'IPZ-11', label: 'ipz-11' },
            { value: 'IPZ-12', label: 'ipz-12' },
          ]}
          value={studentIds}
          onChange={setStudentIds}
          placeholder="Оберіть групи"
        />
        <TextBody className="text-center">або</TextBody>
        <Button
          type="large"
          width="100%"
          className="px-1"
          $bgColor={'transparent'}
          $txtColor={COLORS.accent}
          $brColor={COLORS.accent}
          $brWidth={'2'}
          onClick={() => setIsOpen(true)}
        >
          <TextBody $medium>Згенеруйте запрошення</TextBody>
        </Button>
      </span>
      <SmallText>
        Натиснувши кнопку <strong>«Згенерувати запрошення»</strong>, ви зможете створити персональне
        запрошення для студента.{' '}
        <u style={{ color: COLORS.primary }}>
          Будь ласка, переконайтеся, що надсилаєте його правильному отримувачу.
        </u>
      </SmallText>
      <span className="d-flex flex-column gap-2">
        <TextBody $label>Студенти, які будуть додані до курсу:</TextBody>
        <span className="d-flex align-items-center gap-1">
          {studentIds.map((item) => (
            <Chip key={item}>
              <TextBody $color={COLORS.text}>{item}</TextBody>
            </Chip>
          ))}
        </span>
      </span>
      <ModalWindow
        isOpen={!!isOpen}
        onClose={() => {
          setIsOpen(false);
          setIsGeneric(false);
        }}
        title={
          !isGeneric
            ? 'Створення запрошення'
            : selectedType === 'За посиланням'
              ? 'Запрошення за посиланням'
              : selectedType === 'За email'
                ? 'Запрошення за email'
                : ''
        }
        size="lg"
        footer={
          !isGeneric ? (
            <Button type="large" onClick={() => setIsGeneric(true)}>
              {/* disabled={!newTopicName || !newTopicDesc} onClick={handleAdd} */}
              <TextBody $medium>Згенерувати</TextBody>
            </Button>
          ) : selectedType === 'За посиланням' ? (
            <span className={`d-flex justify-content-between align-items-center w-100 gap-3`}>
              <Button
                $bgColor="transparent"
                $txtColor={COLORS.accent}
                $brWidth="2"
                // onClick={handleBack}
              >
                <TextBody $medium>Скопіювати</TextBody>
              </Button>
              <TextBody>або</TextBody>

              <Button $brWidth="2">
                <TextBody $medium>Згенерувати QR-код</TextBody>
              </Button>
            </span>
          ) : selectedType === 'За email' ? (
            <Button type="large" onClick={() => setIsGeneric(false)}>
              {/* disabled={!newTopicName || !newTopicDesc} onClick={handleAdd} */}
              <TextBody $medium>Надіслати</TextBody>
            </Button>
          ) : (
            ''
          )
        }
      >
        {isGeneric ? (
          selectedType === 'За посиланням' ? (
            <span className="d-flex flex-column gap-3">
              <TextBody $label>Ваше запрошення готове</TextBody>
              <TextBody $italic $underline $color={COLORS.primary}>
                https://yourhelp.io/invite/2a9db9.
              </TextBody>
            </span>
          ) : (
            selectedType === 'За email' && (
              <span className="d-flex flex-column gap-3">
                <Line />
                <Input
                  value={studentEmail}
                  setValue={setStudentEmail}
                  type={InputTypeEnum.EMAIL}
                  placeholder="Введіть email студента"
                  label="Email"
                />
              </span>
            )
          )
        ) : (
          <span className="d-flex flex-column gap-3">
            <span className="d-flex flex-column align-items-start gap-1">
              <TextBody>Назва курсу:</TextBody>
              <Line />
              <TextBody $medium $underline>
                {formData.title}
              </TextBody>
            </span>
            <RadioBlock>
              <TextBody $medium $color={COLORS.text}>
                Тип запрошення
              </TextBody>
              <RadioButton
                value={'За посиланням'}
                selected={selectedType}
                setSelected={setSelectedType}
              />
              <RadioButton
                value={'За email'}
                selected={selectedType}
                setSelected={setSelectedType}
              />
            </RadioBlock>
            <Input
              value={studentText}
              setValue={setStudentText}
              type={InputTypeEnum.TEXT}
              placeholder="Напишіть тут текст"
              label="Повідомлення студенту (необов'язково)"
            />
          </span>
        )}
      </ModalWindow>
    </BasicBlock>
  );
}
