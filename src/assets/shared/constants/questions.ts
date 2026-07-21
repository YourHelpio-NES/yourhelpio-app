import type { AnswerResponse } from '../../../api/tasks/tasks.types';

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
  questionText: string; // додано — потрібно для екрана результатів
  result?: AnswerResponse; // додано — повна відповідь бекенду для skipped немає result
}

export interface SessionType {
  id: string;
  title: string;
  stage: string;
  moduleTitle: string;
  questions: Question[];
}

export interface StudentProgressResponse {
  id: number;
  student_id: number;
  topic_id: number;
  stage: number;
  next_review: string | null;
  next_review_at: string | null;
  current_score: number;
  l1_completed: number;
  l2_completed: number;
  l3_completed: number;
  mistake_count: number;
  in_remediation: boolean;
  total_questions_answered: number;
  preferred_path: 'BASE' | 'EXPRESS';
  tab_switch_count: number;
  current_rank: string;
  updated_at: string;
}
