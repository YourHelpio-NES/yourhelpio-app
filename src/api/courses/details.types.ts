export enum CourseTopicRankEnum {
  NOVICE = 'NOVICE',
  INTERMEDIATE = 'INTERMEDIATE',
  EXPERT = 'EXPERT',
}

export enum CourseTopicPreferredPathEnum {
  BASE = 'BASE',
  EXPRESS = 'EXPRESS',
}

export type CourseTopicRankType = (typeof CourseTopicRankEnum)[keyof typeof CourseTopicRankEnum];
export type CourseTopicPreferredPathType =
  (typeof CourseTopicPreferredPathEnum)[keyof typeof CourseTopicPreferredPathEnum];

export interface CertificateProgress {
  certificate_earned: boolean;
  completed_topics: number;
  completion_pct: number;
  questions_answered: number;
  score: number;
  target_score: number;
  total_possible: number;
  total_topics: number;
}

export interface RouteProgress {
  base_tasks_remaining: number;
  express_tasks_remaining: number;
  points_earned: number;
  points_remaining: number;
  target_score: number;
}

export interface CourseTopicProgress {
  topic_id: number;
  title: string;
  stage: number;
  current_rank: CourseTopicRankType;
  current_score: number;
  progress_pct: number;
  preferred_path: CourseTopicPreferredPathType;
  topic_completed: boolean;
  in_remediation: boolean;
  mistake_count: number;
  next_review: string | null;
}

export interface CourseProgressResponse {
  course_id: number;
  total_score: number;
  target_score: number;
  overall_rank: string;

  certificate_progress: CertificateProgress;
  route_progress: RouteProgress;

  topics: CourseTopicProgress[];

  weak_spots: string[];
}

export type MaterialStatus = 'pending' | 'indexed';

export interface MaterialCourse {
  id: number;
  course_id: number;
  filename: string;
  file_path: string;
  uploaded_at: string;
  status: MaterialStatus;
}

export interface StudentMaterialsCourseResponse {
  materials: MaterialCourse[];
}
