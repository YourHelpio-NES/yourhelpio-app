export interface ReviewItem {
  topic_id: number;
  course_id: number;
  topic_title: string;
  course_title: string;
  is_overdue: boolean;
  topic_url: string;
  stage: number;
}

export interface ActivityStats {
  streak: number;
  total_answers: number;
  accuracy_pct: number | null; // null, якщо відповідей < 10
}

export interface SystemRecommendation {
  topic_id: number;
  topic_title: string;
  course_title: string;
  reason: string;
  topic_url: string;
}
