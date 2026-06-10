export interface QuizStage {
  title: string;
  type: string;
}

export interface QuizResults {
  stage: QuizStage;
  scorePercentage: number;
  correctAnswers: number;
  totalQuestions: number;
  errorsCount: number;
  skippedCount: number;
}

export interface NextStage {
  title: string;
  module: string;
  type: string;
  schedule: string;
}

export interface Explanation {
  questionId: number;
  questionText: string;
  body: string;
}

export interface QuizResultError {
  questionId: number;
  questionText: string;
  statusText: string;
  explanation?: Explanation;
}

export interface QuizSessionData {
  sessionStatus: string;
  results: QuizResults;
  nextStage: NextStage;
  errors: QuizResultError[];
}
