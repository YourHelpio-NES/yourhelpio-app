import { useCallback, useEffect, useMemo, useState } from 'react';
import type {
  ActivityStats,
  ReviewItem,
  SystemRecommendation,
} from '../../../api/dashboard/dashboard.types';
import { axiosInstance } from '../../../api/axios-instance';
import { ToastTypeEnum } from '../constants/custom-toast';
import showToast from '../../../components/toast/show';
import { getErrorMessage } from '../utils/getErrorMessage';

export const useActivityStats = () => {
  const [stats, setStats] = useState<ActivityStats | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await axiosInstance.get('/analytics/student/achievements');
      setStats({
        streak: data.streak,
        total_answers: data.total_answers,
        accuracy_pct: data.accuracy_pct,
      });
    } catch (err: unknown) {
      showToast(ToastTypeEnum.ERROR, 'Помилка', getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const loadSchedule = async () => {
      await fetchData();
    };

    loadSchedule();
  }, [fetchData]);

  return { stats, isLoading };
};

export const useSystemRecommendation = (reviewItems: ReviewItem[]): SystemRecommendation | null => {
  return useMemo(() => {
    if (reviewItems.length === 0) return null;

    // пріоритет — найдовше прострочена тема
    const overdue = reviewItems.filter((i) => i.is_overdue);
    const target = overdue[0] ?? reviewItems[0];

    return {
      topic_id: target.topic_id,
      topic_title: target.topic_title,
      course_title: target.course_title,
      reason: target.is_overdue
        ? 'Ця тема прострочена найдовше — варто повторити першою'
        : 'Рекомендуємо почати з цієї теми сьогодні',
      topic_url: target.topic_url,
    };
  }, [reviewItems]);
};
