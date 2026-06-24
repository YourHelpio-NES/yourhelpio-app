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

export interface WeakTopicTableRow {
  id: number;
  title: string;
  course: string;
  masteryPercent: number;
  weeklyDelta: number | null;
}
