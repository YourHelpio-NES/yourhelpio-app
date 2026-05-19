import { z } from 'zod';
import { passwordRegex, requiredField } from '../hooks/validators/common.validators';

const emailSchema = z.string().min(1, requiredField).email('Некоректний формат електронної пошти');

const passwordSchema = z
  .string()
  .min(1, requiredField)
  .min(8, 'Пароль має містити щонайменше 8 символів')
  .regex(passwordRegex, 'Пароль має містити великі, малі літери та цифру');

export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, requiredField),
});

export const signUpSchema = z
  .object({
    firstName: z.string().min(1, requiredField),
    lastName: z.string().min(1, requiredField),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Підтвердіть пароль'),
    confirmRules: z.boolean().refine((val) => val === true, {
      message: 'Необхідно погодитись з умовами',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Паролі не збігаються',
    path: ['confirmPassword'],
  });

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export type SignInFormData = z.infer<typeof signInSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
