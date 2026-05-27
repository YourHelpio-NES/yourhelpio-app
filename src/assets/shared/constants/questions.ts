export enum QuestionTypeEnum {
  TEXT = 'text',
  RADIO = 'radio',
  CHECKBOX = 'checkbox',
}

export enum QuestionStatusEnum {
  UNANSWERED = 'unanswered',
  CORRECT = 'correct',
  INCORRECT = 'incorrect',
  SKIPPED = 'skipped',
}

export interface Question {
  id: string;
  type: QuestionTypeEnum;
  text: string;
  hint?: string;
  options?: string[];
  correctAnswer?: string | string[];
}

export interface QuestionAnswer {
  questionId: string;
  answer: string | string[];
  status: QuestionStatusEnum;
}

export interface SessionType {
  id: string;
  title: string;
  stage: string;
  moduleTitle: string;
  questions: Question[];
}
