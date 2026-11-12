import { useCallback, useEffect, useMemo, useState } from 'react';
import type { HeatmapRow, TeacherStudent } from '../../../api/courses/courses.types';
import showToast from '../../../components/toast/show';
import { ToastTypeEnum } from '../constants/custom-toast';
import { getErrorMessage } from '../utils/getErrorMessage';
import { coursesApi } from '../../../api/courses/courses.api';

export const useStudentStatusBuckets = (heatmap: HeatmapRow[]) => {
  return useMemo(() => {
    if (heatmap.length === 0) return null;

    let notStarted = 0,
      inProgress = 0,
      completed = 0;

    heatmap.forEach((student) => {
      const totalProgress = student.topics.reduce((sum, t) => sum + t.progress_pct, 0);
      const avgProgress = totalProgress / (student.topics.length || 1);

      if (avgProgress === 0) notStarted++;
      else if (avgProgress >= 90) completed++;
      else inProgress++;
    });

    const total = heatmap.length;
    return {
      inProgressPct: Math.round((inProgress / total) * 100),
      completedPct: Math.round((completed / total) * 100),
      notStartedPct: Math.round((notStarted / total) * 100),
    };
  }, [heatmap]);
};

export const useCourseTopicsCount = (courseId: number) => {
  const [topicsCount, setTopicsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCount = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await coursesApi.getTopics(courseId);
      setTopicsCount(data.length);
    } catch (err: unknown) {
      showToast(
        ToastTypeEnum.ERROR,
        'Помилка',
        getErrorMessage(err, 'Не вдалося завантажити теми')
      );
    } finally {
      setIsLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    const load = async () => {
      await fetchCount();
    };
    load();
  }, [fetchCount]);

  return { topicsCount, isLoading, refetch: fetchCount };
};

export const useCourseStudentsCount = (courseId: number) => {
  const [studentsCount, setStudentsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCount = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await coursesApi.getStudents(courseId);
      setStudentsCount(data.students.length);
    } catch (err: unknown) {
      showToast(
        ToastTypeEnum.ERROR,
        'Помилка',
        getErrorMessage(err, 'Не вдалося завантажити студентів')
      );
    } finally {
      setIsLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    const load = async () => {
      await fetchCount();
    };
    load();
  }, [fetchCount]);

  return { studentsCount, isLoading, refetch: fetchCount };
};

export const useCourseStudents = (courseId: number) => {
  const [students, setStudents] = useState<TeacherStudent[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchStudents = useCallback(async () => {
    setIsLoading(true);

    try {
      const { data } = await coursesApi.getStudents(courseId);
      setStudents(data.students);
    } catch (err: unknown) {
      showToast(ToastTypeEnum.ERROR, 'Помилка', getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    const load = async () => {
      await fetchStudents();
    };
    void load();
  }, [fetchStudents]);

  return { students, isLoading };
};
