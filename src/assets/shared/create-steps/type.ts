export enum StepStatusEnum {
  DONE = 'done',
  ACTIVE = 'active',
  PENDING = 'pending',
}

export interface StepCreating {
  name: string;
  description: string;
  title: string;
  subTitle: string;
  path: string;
  status: StepStatusEnum;
}

export interface CourseFormData {
  title?: string;
  description?: string;
  topicIds?: { name: string; description: string }[];
  studentIds?: string[];
}

export interface CourseCreateContextValue {
  formData: CourseFormData;
  updateForm: (patch: Partial<CourseFormData>) => void;
  setStepValid: (step: number, valid: boolean) => void;
  isStepValid: (step: number) => boolean;
  resetForm: () => void;
}
