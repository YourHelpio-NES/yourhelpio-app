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
