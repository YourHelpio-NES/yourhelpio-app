import { useCallback, useEffect, useMemo, useState } from 'react';
import { scheduleApi } from '../../../api/schedule/schedule.api';
import { ToastTypeEnum } from '../constants/custom-toast';
import showToast from '../../../components/toast/show';
import { getErrorMessage } from '../utils/getErrorMessage';
import { getTomorrowDateString } from '../utils/date';
import type { ScheduleItem } from '../../../api/schedule/schedule.types';

export const useReviewNeeded = () => {
  const [items, setItems] = useState<ScheduleItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await scheduleApi.getSchedule({ days: 14 });
      const mapped = data.items.map((item) => ({
        topic_id: item.topic_id,
        topic_title: item.topic_title,
        course_id: item.course_id,
        course_title: item.course_title,
        stage: item.stage,
        next_review: item.next_review,
        next_review_at: item.next_review_at,
        is_overdue: item.is_overdue,
        is_today: item.is_today,
        topic_url: item.topic_url,
      }));
      setItems(mapped);
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

  const tomorrowDate = useMemo(() => getTomorrowDateString(), []);

  const overdueItems = useMemo(() => items.filter((item) => item.is_overdue), [items]);

  const todayItems = useMemo(() => items.filter((item) => item.is_today), [items]);

  const tomorrowItems = useMemo(
    () => items.filter((item) => item.next_review === tomorrowDate),
    [items, tomorrowDate]
  );

  return {
    items, // всі, якщо десь потрібен повний список без фільтра
    isLoading,
    overdueItems,
    todayItems,
    tomorrowItems,
    refetch: fetchData,
  };
};
