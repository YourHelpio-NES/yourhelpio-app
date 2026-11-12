import { useCallback, useState } from 'react';
import { topicsApi } from '../../../api/tasks/tasks.api';
import showToast from '../../../components/toast/show';
import { ToastTypeEnum } from '../constants/custom-toast';
import { getErrorMessage } from '../utils/getErrorMessage';
import type { TopicStudentDetails } from '../../../api/tasks/tasks.types';
import { coursesApi } from '../../../api/courses/courses.api';

export const useTopicDetailsStudent = () => {
  const [topic, setTopic] = useState<TopicStudentDetails>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchTopic = useCallback(async (id: number) => {
    setIsLoading(true);

    try {
      const { data } = await topicsApi.getDetailsById(id);
      setTopic(data);
    } catch (err) {
      showToast(
        ToastTypeEnum.ERROR,
        'Помилка завантаження',
        getErrorMessage(err, 'Не вдалося завантажити тему')
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    topic,
    isLoading,
    fetchTopic,
  };
};

export const useTopicSummary = () => {
  const [summary, setSummary] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchSummary = useCallback(async (topicId: number) => {
    setIsLoading(true);
    try {
      const { data } = await coursesApi.getTopicById(topicId);
      setSummary(data.passport?.summary ?? 'Опис ще формується.');
    } catch {
      setSummary('Не вдалося завантажити опис теми.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { summary, isLoading, fetchSummary };
};
