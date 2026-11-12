import { useForm } from 'react-hook-form';
import { signUpSchema, type SignUpFormData } from '../../schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../../../api/auth/auth.api';
import { useAuthStore } from '../../../../store/auth.store';
import { roles } from '../../constants/roles';
import { UserRoleEnum } from '../../../../api/auth/auth.type';
import showToast from '../../../../components/toast/show';
import { ToastTypeEnum } from '../../constants/custom-toast';
import { getErrorMessage } from '../../utils/getErrorMessage';

export const useSignUpForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      confirmRules: false,
      role: undefined,
    },
    mode: 'onTouched',
  });

  const login = useAuthStore((state) => state.login);

  const onSubmit = form.handleSubmit(async (data) => {
    console.log('role:', data.role);
    console.log('role type:', typeof data.role);
    console.log('role JSON:', JSON.stringify(data.role));
    console.log(signUpSchema.shape.role);

    setIsLoading(true);
    try {
      const { data: response } = await authApi.register({
        full_name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        role: roles.find((item) => item.label === data.role)?.value as UserRoleEnum,
        password: data.password,
      });

      const { data: loginResponse } = await authApi.login({
        email: data.email,
        password: data.password,
      });

      login(loginResponse.access_token, loginResponse.user);

      showToast(
        ToastTypeEnum.SUCCESS,
        'Успішна реєстрація',
        'Ваш обліковий запис успішно створено'
      );

      navigate(response.user.role === UserRoleEnum.TEACHER ? '/teacher' : '/student');
    } catch (err: unknown) {
      showToast(
        ToastTypeEnum.ERROR,
        'Помилка реєстрації',
        getErrorMessage(err, 'Перевірте email та пароль')
      );
    } finally {
      setIsLoading(false);
    }
  });

  return { form, onSubmit, isLoading };
};
