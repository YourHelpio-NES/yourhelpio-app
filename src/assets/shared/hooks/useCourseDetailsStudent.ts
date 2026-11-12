import { useCallback, useEffect, useState } from 'react';
import type { CourseProgressResponse } from '../../../api/courses/details.types';
import { coursesApi } from '../../../api/courses/courses.api';
import showToast from '../../../components/toast/show';
import { ToastTypeEnum } from '../constants/custom-toast';
import { getErrorMessage } from '../utils/getErrorMessage';
import type { CourseEntity } from '../../../api/courses/courses.types';

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

export const useCourseDetailsTeacher = (courseId: number) => {
  const [course, setCourse] = useState<CourseEntity | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCourse = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await coursesApi.getMy();
      const found = data.courses.find((c) => c.id === courseId) ?? null;
      setCourse(found);
    } catch (err: unknown) {
      showToast(
        ToastTypeEnum.ERROR,
        'Помилка',
        getErrorMessage(err, 'Не вдалося завантажити курс')
      );
    } finally {
      setIsLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    const load = async () => {
      await fetchCourse();
    };
    load();
  }, [fetchCourse]);

  return { course, isLoading, refetch: fetchCourse };
};
