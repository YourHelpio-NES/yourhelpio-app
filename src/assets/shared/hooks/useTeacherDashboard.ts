import { useState, useCallback, useEffect, useMemo } from 'react';
import { coursesApi, teacherAnalyticsApi } from '../../../api/courses/courses.api';
import type { CourseEntity, TeacherCourseAnalytics } from '../../../api/courses/courses.types';
import showToast from '../../../components/toast/show';
import { ToastTypeEnum } from '../constants/custom-toast';
import { getErrorMessage } from '../utils/getErrorMessage';

export const RANK_LABELS: Record<string, string> = {
  NOVICE: 'Новачок',
  PRACTITIONER: 'Практик',
  EXPERT: 'Експерт',
  GURU: 'Гуру',
};

export const useTeacherDashboard = (courseId: number | null) => {
  const [data, setData] = useState<TeacherCourseAnalytics | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    if (!courseId) return;
    setIsLoading(true);
    try {
      const { data } = await teacherAnalyticsApi.getCourseAnalytics(courseId);
      setData(data);
    } catch (err: unknown) {
      showToast(
        ToastTypeEnum.ERROR,
        'Помилка',
        getErrorMessage(err, 'Не вдалося завантажити аналітику')
      );
    } finally {
      setIsLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    const load = async () => {
      await fetchData();
    };

    load();
  }, [fetchData]);

  const studentsCount = data?.heatmap.length ?? 0;

  // розподіл оцінок 1-5
  const gradeDistribution = useMemo(() => {
    if (!data) return [];
    return [1, 2, 3, 4, 5].map((grade) => ({
      grade,
      count: data.grade_vs_rank.filter((s) => Math.round(s.grade) === grade).length,
    }));
  }, [data]);

  const averageGrade = useMemo(() => {
    if (!data || data.grade_vs_rank.length === 0) return 0;
    const sum = data.grade_vs_rank.reduce((acc, s) => acc + s.grade, 0);
    return Math.round((sum / data.grade_vs_rank.length) * 10) / 10;
  }, [data]);

  // розподіл рангів
  const rankDistribution = useMemo(() => {
    const counts: Record<string, number> = { NOVICE: 0, PRACTITIONER: 0, EXPERT: 0, GURU: 0 };
    data?.grade_vs_rank.forEach((s) => {
      counts[s.rank] = (counts[s.rank] ?? 0) + 1;
    });
    return counts;
  }, [data]);

  // середній прогрес по кожній темі, відсортований за зростанням (найслабші перші)
  const weakestTopics = useMemo(() => {
    if (!data || data.heatmap.length === 0) return [];
    const aggregates: Record<number, { title: string; sum: number; count: number }> = {};

    data.heatmap.forEach((row) => {
      row.topics.forEach((t) => {
        if (!aggregates[t.topic_id]) {
          aggregates[t.topic_id] = { title: t.topic_title, sum: 0, count: 0 };
        }
        aggregates[t.topic_id].sum += t.progress_pct;
        aggregates[t.topic_id].count += 1;
      });
    });

    return Object.entries(aggregates)
      .map(([topicId, agg]) => ({
        topicId: Number(topicId),
        title: agg.title,
        avgProgress: Math.round(agg.sum / agg.count),
      }))
      .sort((a, b) => a.avgProgress - b.avgProgress);
  }, [data]);

  // топ питань з найвищим % неправильних відповідей
  const topFailingQuestions = useMemo(() => {
    if (!data) return [];
    return [...data.content_gaps].sort((a, b) => b.wrong_rate_pct - a.wrong_rate_pct).slice(0, 5);
  }, [data]);

  // легкі питання (L1), які масово провалюють — ймовірно погане формулювання
  const suspiciousEasyQuestions = useMemo(() => {
    if (!data) return [];
    return data.content_gaps.filter((g) => g.difficulty_level === 'L1' && g.wrong_rate_pct > 40);
  }, [data]);

  // студенти з найнижчою оцінкою — потребують уваги
  const strugglingStudents = useMemo(() => {
    if (!data) return [];
    return [...data.grade_vs_rank].sort((a, b) => a.grade - b.grade).slice(0, 5);
  }, [data]);

  // висока к-ть перемикань вкладки + висока оцінка — підозріло
  const suspiciousStudents = useMemo(() => {
    if (!data) return [];
    return data.grade_vs_rank.filter((s) => s.tab_switches > 10 && s.grade >= 4);
  }, [data]);

  return {
    data,
    isLoading,
    studentsCount,
    gradeDistribution,
    averageGrade,
    rankDistribution,
    weakestTopics,
    topFailingQuestions,
    suspiciousEasyQuestions,
    strugglingStudents,
    suspiciousStudents,
    refetch: fetchData,
  };
};

export const useTeacherCourses = () => {
  const [courses, setCourses] = useState<CourseEntity[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCourses = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await coursesApi.getMy();
      setCourses(data.courses);
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

  return { courses, isLoading };
};
