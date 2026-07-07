import { useForm } from 'react-hook-form';
import { signInSchema, type SignInFormData } from '../../schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { ToastTypeEnum } from '../../constants/custom-toast';
import showToast from '../../../../components/toast/show';

export const useSignInForm = () => {
  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onTouched',
  });

  const onSubmit = form.handleSubmit((data) => {
    console.log('Sign in:', data);
    showToast(ToastTypeEnum.SUCCESS, 'Успішний ввід даних', 'Раді бачити вас знову!');
  });
  return { form, onSubmit };
};
