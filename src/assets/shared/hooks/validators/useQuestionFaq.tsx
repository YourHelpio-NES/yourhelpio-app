import { useForm } from 'react-hook-form';
import {
  questionFaqSchema,
  type QuestionFaqSchemaFormData,
} from '../../schemas/question-faq.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import showToast from '../../../../components/toast/show';
import { ToastTypeEnum } from '../../constants/custom-toast';

export const useQuestionFaqForm = () => {
  const form = useForm<QuestionFaqSchemaFormData>({
    resolver: zodResolver(questionFaqSchema),
    defaultValues: { questionName: '' },
    mode: 'onTouched',
  });

  const onSubmit = form.handleSubmit(() => {
    showToast(ToastTypeEnum.SUCCESS, 'Запитання додане', 'Відповідь надійде пізніше');
  });
  return { form, onSubmit };
};
