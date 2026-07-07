import { useEffect } from 'react';
import { BasicBlock } from '../../../../../components/blocks';
import Input from '../../../../../components/input';
import { InputTypeEnum } from '../../../../../assets/shared/constants/input';
import { SmallText, TextBody } from '../../../../../assets/styles/typography';
import { mainCourseSchema } from '../../../../../assets/shared/schemas/course.schema';
import type z from 'zod';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCourseCreate } from '../../../../../assets/shared/hooks/useCourseCreate';

export type FormValuesMainCourse = z.infer<typeof mainCourseSchema>;

export default function BasicInfoStep() {
  const { formData, updateForm, setStepValid } = useCourseCreate();

  const {
    control,
    formState: { errors, isValid },
  } = useForm<FormValuesMainCourse>({
    resolver: zodResolver(mainCourseSchema),
    defaultValues: { title: formData.title, description: formData.description },
    mode: 'onChange',
  });

  const values = useWatch({
    control,
  });

  useEffect(() => {
    updateForm(values);
    setStepValid(0, isValid);
  }, [values, isValid, updateForm, setStepValid]);

  return (
    <BasicBlock>
      <span className="d-flex flex-column gap-md-2 gap-1">
        <TextBody $label>Назва *</TextBody>
        <SmallText>Коротка та зрозуміла назва, яку бачитимуть студенти</SmallText>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <Input
              value={field.value ?? ''}
              setValue={field.onChange}
              onBlur={field.onBlur}
              type={InputTypeEnum.TEXT}
              placeholder="Наприклад: Основи алгоритмів"
              errorText={errors.title?.message}
            />
          )}
        />
      </span>
      <span className="d-flex flex-column gap-md-2 gap-1">
        <TextBody $label>Опис</TextBody>
        <SmallText>1–2 речення достатньо</SmallText>

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Input
              value={field.value ?? ''}
              setValue={field.onChange}
              onBlur={field.onBlur}
              type={InputTypeEnum.TEXT}
              placeholder="Опишіть, що вивчатимуть студенти та які навички отримають"
              errorText={errors.description?.message}
            />
          )}
        />
      </span>
    </BasicBlock>
  );
}
