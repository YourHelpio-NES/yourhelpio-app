import { axiosInstance } from '../axios-instance';
import type {
  CourseEntity,
  EnrolledCoursesResponse,
  TeacherCourseAnalytics,
  TeacherStudent,
  TopicListItem,
} from './courses.types';
import type { CourseProgressResponse, StudentMaterialsCourseResponse } from './details.types';

export const coursesApi = {
  getEnrolled: () => axiosInstance.get<EnrolledCoursesResponse>('/courses/enrolled'),

  getDetailsById: (id: number) =>
    axiosInstance.get<CourseProgressResponse>(`/analytics/student/courses/${id}`),

  getStudentMaterials: (courseId: number) =>
    axiosInstance.get<StudentMaterialsCourseResponse>(`/courses/${courseId}/student-materials`),

  downloadMaterial: (courseId: number, materialId: number) =>
    axiosInstance.get(`/courses/${courseId}/materials/${materialId}/download`, {
      responseType: 'blob',
    }),

  getMy: () => axiosInstance.get<{ courses: CourseEntity[] }>('/courses/my'),

  getStudents: (courseId: number) =>
    axiosInstance.get<{ students: TeacherStudent[] }>(`/courses/${courseId}/students`),

  getTopics: (courseId: number) =>
    axiosInstance.get<TopicListItem[]>(`/courses/${courseId}/topics`),

  getTopicById: (topicId: number) => axiosInstance.get<TopicListItem>(`/topics/${topicId}`),

  createCourse: (payload: { title: string; description?: string }) =>
    axiosInstance.post<{ course: CourseEntity }>('/courses', payload),

  createTopic: (courseId: number, payload: { title: string }) =>
    axiosInstance.post<TopicListItem>(`/courses/${courseId}/topics`, payload),
};

export const teacherAnalyticsApi = {
  getCourseAnalytics: (courseId: number) =>
    axiosInstance.get<TeacherCourseAnalytics>(`/analytics/teacher/courses/${courseId}`),
};
