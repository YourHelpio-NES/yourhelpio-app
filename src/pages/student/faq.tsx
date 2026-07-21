import { useState } from 'react';
import { FilterTypesFaq } from '../../assets/shared/constants/faq-types';
import { COLORS } from '../../assets/styles/colors';
import { CardTitle, SmallText, TextBody } from '../../assets/styles/typography';
import { BasicBlock } from '../../components/blocks';
import { Button } from '../../components/button';
import { LinkTitle } from '../../components/title-section';
import AppLayout from '../../components/widgets/app/layout';
import { BodyTable } from './study-plan';
import { extremelyRepeating } from '../../assets/shared/data/courses';
import { ErrorsBlock } from './start-studying/result';
import { UserIconFaq } from '../../assets/images/icons/user-icon-faq';
import { Controller } from 'react-hook-form';
import { useQuestionFaqForm } from '../../assets/shared/hooks/validators/useQuestionFaq';
import Input from '../../components/input';
import { InputTypeEnum } from '../../assets/shared/constants/input';
import { useFilterForm } from '../../assets/shared/hooks/validators/useFilterDropdown';
import { Select } from '../../components/dropdown';

export default function FaqStudentPage() {
  const [filterType, setFilterType] = useState<string>(FilterTypesFaq.ALL);
  const [selectCourse, setSelectCourse] = useState<string>(extremelyRepeating[0].course);

  const { form, onSubmit } = useQuestionFaqForm();
  const {
    control,
    formState: { errors },
  } = form;

  const { form: selectForm } = useFilterForm(extremelyRepeating[0].id.toString());
  const {
    control: selectControl,
    formState: { errors: selectErrors },
  } = selectForm;

  const [questionType, setQuestionType] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');

  return (
    <AppLayout>
      <BodyTable className="gap-md-4 gap-3 align-items-start" $gap={24}>
        <BasicBlock $gap={24}>
          <span className="d-flex flex-column gap-2">
            <LinkTitle firstTitle="Часті запитання (FAQ)" />
            <TextBody>Знайдіть відповіді на найпоширеніші питання щодо курсу</TextBody>
          </span>
          <BasicBlock $gap={12}>
            <span className="d-flex gap-2 pb-2">
              <Input
                value={searchValue}
                setValue={setSearchValue}
                type={InputTypeEnum.TEXT}
                placeholder="Пошук питання..."
              />
              <Button>
                <TextBody>Пошук</TextBody>
              </Button>
            </span>
            <span className="d-flex flex-wrap gap-1">
              {Object.entries(FilterTypesFaq).map((item, key) => (
                <Button
                  $bgColor={filterType === item[1] ? COLORS.secondary : 'transparent'}
                  $txtColor={filterType === item[1] ? COLORS.lighterBg : COLORS.text}
                  $brColor={filterType === item[1] ? COLORS.secondary : COLORS.text}
                  width="auto"
                  $type={'small'}
                  key={key}
                  onClick={() => setFilterType(item[1])}
                >
                  <SmallText>{item[1]}</SmallText>
                </Button>
              ))}
            </span>
            <span className="d-flex flex-wrap gap-1">
              {extremelyRepeating.map((item, key) => (
                <Button
                  $bgColor={COLORS.lighterBg}
                  $txtColor={selectCourse === item.course ? COLORS.secondary : COLORS.text}
                  $brWidth={selectCourse === item.course ? '2' : '1'}
                  $brColor={COLORS.secondary}
                  width="auto"
                  $type={'small'}
                  key={key}
                  onClick={() => setSelectCourse(item.course)}
                >
                  <SmallText $medium={selectCourse === item.course}>{item.course}</SmallText>
                </Button>
              ))}
            </span>
          </BasicBlock>

          {/* <QuestionsAccordion /> */}
        </BasicBlock>
        <ErrorsBlock
          $bgColor={COLORS.lighterBg}
          $titleColor={COLORS.text}
          className="align-items-start"
          data-type="add-faq-block"
          $gap={16}
        >
          <span className="d-flex gap-2 align-items-center">
            <UserIconFaq color={COLORS.text} />
            <CardTitle>Не знайшли відповідь?</CardTitle>
          </span>
          <Controller
            name="questionName"
            control={control}
            render={({ field }) => (
              <Input
                type={InputTypeEnum.TEXT}
                value={field.value}
                setValue={field.onChange}
                label="Запитайте потрібну для вас інформацію"
                placeholder="Заповніть поле"
                errorText={errors.questionName?.message}
                onBlur={field.onBlur}
              />
            )}
          />
          <Controller
            name="item"
            control={selectControl}
            render={({ field }) => (
              <Select
                value={field.value}
                onChange={(val) => {
                  field.onChange(val);
                  field.onBlur();
                }}
                options={extremelyRepeating.map((item) => {
                  return {
                    label: item.course,
                    value: item.id.toString(),
                  };
                })}
                label="Курс"
                sublabel="Оберіть курс, щоб конкретизувати запит"
                width="100%"
                labelColor={COLORS.text}
                errorText={
                  extremelyRepeating.length === 0
                    ? 'Немає доступних елементів'
                    : selectErrors.item?.message
                }
              />
            )}
          />
          <div className="d-flex flex-column gap-2">
            <TextBody $label>Категорії</TextBody>
            <SmallText $color={COLORS.text}>
              Оберіть категорію, щоб швидше отримати відповідь (опціонально)
            </SmallText>
            <span className="d-flex flex-wrap gap-1">
              {Object.entries(FilterTypesFaq)
                .slice(1)
                .map((item, key) => (
                  <Button
                    $bgColor={questionType === item[1] ? COLORS.secondary : 'transparent'}
                    $txtColor={questionType === item[1] ? COLORS.lighterBg : COLORS.text}
                    $brColor={questionType === item[1] ? COLORS.secondary : COLORS.text}
                    width="auto"
                    $type={'small'}
                    key={key}
                    onClick={() => setQuestionType(item[1])}
                  >
                    <SmallText>{item[1]}</SmallText>
                  </Button>
                ))}
            </span>
          </div>
          <Button $bgColor={COLORS.primary} $brColor={COLORS.primary} onClick={onSubmit}>
            <TextBody $medium>Надіслати</TextBody>
          </Button>
        </ErrorsBlock>
      </BodyTable>
    </AppLayout>
  );
}
