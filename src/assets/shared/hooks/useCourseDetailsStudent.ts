import { useCallback, useState } from 'react';
import type { CourseProgressResponse } from '../../../api/courses/details.types';
import { coursesApi } from '../../../api/courses/courses.api';
import showToast from '../../../components/toast/show';
import { ToastTypeEnum } from '../constants/custom-toast';
import { getErrorMessage } from '../utils/getErrorMessage';

export const useCourseDetailsStudent = () => {
  const [course, setCourse] = useState<CourseProgressResponse>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchCourse = useCallback(async (id: number) => {
    setIsLoading(true);

    try {
      const { data } = await coursesApi.getDetailsById(id);
      setCourse({
        ...data,
        topics: [...data.topics].sort((a, b) => a.topic_id - b.topic_id),
      });
      return data;
    } catch (err) {
      showToast(
        ToastTypeEnum.ERROR,
        'Помилка завантаження',
        getErrorMessage(err, 'Не вдалося завантажити курс')
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    course,
    isLoading,
    fetchCourse,
  };
};
