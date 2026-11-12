import { useState, useCallback, useEffect } from 'react';
import type { TopicListItem } from '../../../api/courses/courses.types';
import { coursesApi } from '../../../api/courses/courses.api';

export const useCourseTopicsList = (courseId: number) => {
  const [topics, setTopics] = useState<TopicListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetch = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await coursesApi.getTopics(courseId);
      setTopics(data);
    } finally {
      setIsLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    const load = async () => {
      await fetch();
    };
    load();
  }, [fetch]);

  return { topics, isLoading, refetch: fetch };
};
