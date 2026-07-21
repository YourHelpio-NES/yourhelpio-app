import { axiosInstance } from '../axios-instance';
import type { EnrolledCoursesResponse } from './courses.types';
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
};
