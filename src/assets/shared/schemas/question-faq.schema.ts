import { z } from 'zod';
import { requiredField } from '../hooks/validators/common.validators';

export const questionFaqSchema = z.object({
  questionName: z.string().min(1, requiredField),
});

export type QuestionFaqSchemaFormData = z.infer<typeof questionFaqSchema>;
