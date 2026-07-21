import { useCallback, useEffect, useState } from 'react';
import type { CourseEntity } from '../../../api/courses/courses.types';
import { coursesApi } from '../../../api/courses/courses.api';
import showToast from '../../../components/toast/show';
import { ToastTypeEnum } from '../constants/custom-toast';
import { getErrorMessage } from '../utils/getErrorMessage';

export const useEnrolledCourses = () => {
  const [courses, setCourses] = useState<CourseEntity[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchCourses = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await coursesApi.getEnrolled();
      setCourses(data.courses);
    } catch (err: unknown) {
      showToast(
        ToastTypeEnum.ERROR,
        'Помилка завантаження',
        getErrorMessage(err, 'Не вдалося завантажити курси')
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const loadSchedule = async () => {
      await fetchCourses();
    };

    loadSchedule();
  }, [fetchCourses]);

  return { courses, isLoading, refetch: fetchCourses };
};
