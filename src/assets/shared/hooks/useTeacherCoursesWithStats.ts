import { useState, useCallback, useEffect } from 'react';
import type { CourseWithStats } from '../../../api/courses/courses.types';
import showToast from '../../../components/toast/show';
import { ToastTypeEnum } from '../constants/custom-toast';
import { getErrorMessage } from '../utils/getErrorMessage';
import { coursesApi } from '../../../api/courses/courses.api';

export const useTeacherCoursesWithStats = () => {
  const [courses, setCourses] = useState<CourseWithStats[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCourses = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await coursesApi.getMy();

      const withStats = await Promise.all(
        data.courses.map(async (course) => {
          const [topicsRes, studentsRes] = await Promise.all([
            coursesApi.getTopics(course.id),
            coursesApi.getStudents(course.id),
          ]);

          return {
            id: course.id,
            title: course.title,
            description: course.description,
            target_score: course.target_score,
            created_at: course.created_at,
            topicsCount: topicsRes.data.length,
            studentsCount: studentsRes.data.students.length,
          };
        })
      );

      setCourses(withStats);
    } catch (err: unknown) {
      showToast(
        ToastTypeEnum.ERROR,
        'Помилка',
        getErrorMessage(err, 'Не вдалося завантажити курси')
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const load = async () => {
      await fetchCourses();
    };

    load();
  }, [fetchCourses]);

  return { courses, isLoading, refetch: fetchCourses };
};
