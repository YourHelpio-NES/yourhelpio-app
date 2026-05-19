export interface TaskTableRow {
  id: string;
  name: string;
  day: string;
  type: string;
  questions: number;
  completed: boolean;
}

export interface ThemeTableRow {
  id: string;
  themeName: string;
  stage?: string;
  progress?: string;
}
