export interface Task {
  id: number;
  topic_id: number;
  difficulty_level: number;
  task_type: string;
  task_weight: number;
  question: string;
  options: string[];

  chunk_id: number | null;
  page_number: number | null;
}

export interface TasksTodayResponse {
  tasks: Task[];
  count: number;
  time_limit_seconds: number;
  next_review_at: string | null;
}

export interface AnswerPayload {
  answer: string;
}

export interface AnswerResponse {
  is_correct: boolean;
  score_earned: number;
  correct_answer: string;
  explanation: string;
  feedback: string;
  current_score: number;
  current_rank: string;
}

export enum TopicStatusEnum {
  PROCESSING = 'PROCESSING',
  APPROVED = 'APPROVED',
}

export interface TopicPassport {
  difficulty: number;
  keywords: string[];
  outcomes: string[];
  summary: string;
}

export interface TopicStudentDetails {
  course_id: number;
  created_at: string;
  id: number;
  material_id: number | null;
  passport: TopicPassport;
  status: TopicStatusEnum;
  title: string;
}
