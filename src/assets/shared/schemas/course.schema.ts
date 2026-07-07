import z from 'zod';

export const mainCourseSchema = z.object({
  title: z.string().min(3, 'Назва має бути не менше 3 символів'),
  description: z.string().min(10, 'Опис має бути не менше 10 символів'),
});
