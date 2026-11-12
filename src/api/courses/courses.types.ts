export interface CourseEntity {
  id: number;
  title: string;
  description: string | null;
  invite_code: string;
  teacher_id: number;
  target_score: number;
  tasks_per_session_base: number;
  tasks_per_session_express: number;
  certificate_questions_target: number;
  time_limit_per_question: number;
  created_at: string;
}

export interface EnrolledCoursesResponse {
  courses: CourseEntity[];
}

export interface HeatmapTopicEntry {
  topic_id: number;
  topic_title: string;
  progress_pct: number;
}

export interface HeatmapRow {
  student_id: number;
  student_name: string;
  topics: HeatmapTopicEntry[];
}

export interface ContentGap {
  task_id: number;
  question: string;
  difficulty_level: string | null;
  total_attempts: number;
  wrong_count: number;
  wrong_rate_pct: number;
}

export interface GradeVsRankEntry {
  student_id: number;
  student_name: string;
  grade: number;
  rank: string;
  tab_switches: number;
}

export interface TeacherCourseAnalytics {
  course_id: number;
  course_title: string;
  target_score: number;
  heatmap: HeatmapRow[];
  content_gaps: ContentGap[];
  grade_vs_rank: GradeVsRankEntry[];
}

export interface TeacherStudent {
  id: number;
  full_name: string;
  email: string;
}

export interface TopicListItem {
  id: number;
  course_id: number;
  material_id: number | null;
  title: string;
  passport: {
    outcomes?: string[];
    keywords?: string[];
    difficulty?: number;
    summary?: string;
  } | null;
  status: 'PROCESSING' | 'APPROVED';
  created_at: string;
}

export interface CourseWithStats {
  id: number;
  title: string;
  description: string | null;
  target_score: number;
  created_at: string;
  topicsCount: number;
  studentsCount: number;
}
