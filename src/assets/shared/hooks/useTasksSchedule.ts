import { useCallback, useEffect, useState } from 'react';
import type { ScheduleItem } from '../../../api/schedule/schedule.types';
import { scheduleApi } from '../../../api/schedule/schedule.api';
import showToast from '../../../components/toast/show';
import { ToastTypeEnum } from '../constants/custom-toast';
import { getErrorMessage } from '../utils/getErrorMessage';

export const useTasksSchedule = (days = 14) => {
  const [items, setItems] = useState<ScheduleItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchSchedule = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await scheduleApi.getSchedule({ days });
      console.log(data);
      setItems(data.items);
    } catch (err: unknown) {
      showToast(
        ToastTypeEnum.ERROR,
        'Помилка завантаження',
        getErrorMessage(err, 'Не вдалося завантажити завдання на сьогодні')
      );
    } finally {
      setIsLoading(false);
    }
  }, [days]);

  useEffect(() => {
    const loadSchedule = async () => {
      await fetchSchedule();
    };

    loadSchedule();
  }, [fetchSchedule]);

  const todayItems = items.filter((item) => item.is_today);
  const overdueItems = items.filter((item) => item.is_overdue);
  const upcomingItems = items.filter((item) => !item.is_today && !item.is_overdue);

  return {
    isLoading,
    todayItems,
    overdueItems,
    upcomingItems,
    refetch: fetchSchedule,
  };
};
