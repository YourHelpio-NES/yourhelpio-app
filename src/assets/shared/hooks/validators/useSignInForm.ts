import { useForm } from 'react-hook-form';
import { signInSchema, type SignInFormData } from '../../schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { ToastTypeEnum } from '../../constants/custom-toast';
import showToast from '../../../../components/toast/show';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../../../api/auth/auth.api';
import { useAuthStore } from '../../../../store/auth.store';
import { UserRoleEnum } from '../../../../api/auth/auth.type';
import { getErrorMessage } from '../../utils/getErrorMessage';

export const useSignInForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const login = useAuthStore((state) => state.login);

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onTouched',
  });

  const onSubmit = form.handleSubmit(async (data) => {
    setIsLoading(true);
    try {
      const { data: response } = await authApi.login(data);

      login(response.access_token, response.user);

      showToast(ToastTypeEnum.SUCCESS, 'Успішний вхід', 'Раді бачити вас знову!');

      navigate(response.user.role === UserRoleEnum.TEACHER ? '/teacher' : '/student');
    } catch (err: unknown) {
      showToast(
        ToastTypeEnum.ERROR,
        'Помилка входу',
        getErrorMessage(err, 'Перевірте email та пароль')
      );
    } finally {
      setIsLoading(false);
    }
  });

  return { form, onSubmit, isLoading };
};
