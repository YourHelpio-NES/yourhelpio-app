export interface TaskTableRow {
  id: string;
  name: string;
  day: string;
  type: string;
  questions: number;
  completed: boolean;
  duration: number;
}

export interface ThemeTableRow {
  id: string;
  topicName: string;
  stage?: string;
  progress?: string;
}
