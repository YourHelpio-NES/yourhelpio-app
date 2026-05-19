import z from 'zod';

export const filterSchema = z.object({
  item: z.string({ message: 'Оберіть елемент' }).min(1, 'Оберіть елемент'),
});

export type FilterFormData = z.infer<typeof filterSchema>;
