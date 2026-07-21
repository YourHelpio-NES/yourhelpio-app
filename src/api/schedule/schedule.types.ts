export interface ScheduleItem {
  course_id: number;
  course_title: string;
  topic_id: number;
  topic_title: string;
  next_review: string;
  next_review_at: string | null;
  stage: number;
  is_overdue: boolean;
  is_today: boolean;
  topic_url: string;
}

export interface ScheduleResponse {
  items: ScheduleItem[];
}

export interface GetScheduleParams {
  days?: number;
}
