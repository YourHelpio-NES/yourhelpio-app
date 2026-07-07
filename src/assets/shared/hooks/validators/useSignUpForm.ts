import { useForm } from 'react-hook-form';
import { signUpSchema, type SignUpFormData } from '../../schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';

export const useSignUpForm = () => {
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      confirmRules: false,
    },
    mode: 'onTouched',
  });

  const onSubmit = form.handleSubmit((data) => {
    console.log('Sign up:', data);
  });

  return { form, onSubmit };
};
