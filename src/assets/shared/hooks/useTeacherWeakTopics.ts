import { useState, useCallback, useEffect } from 'react';
import { teacherAnalyticsApi } from '../../../api/courses/courses.api';
import type { CourseWithStats } from '../../../api/courses/courses.types';
import showToast from '../../../components/toast/show';
import { ToastTypeEnum } from '../constants/custom-toast';
import { getErrorMessage } from '../utils/getErrorMessage';

export interface WeakTopicRow {
  id: number; // topic_id
  title: string;
  courseId: number;
  courseTitle: string;
  masteryPercent: number;
  studentCount: number;
}

export const useTeacherWeakTopics = (courses: CourseWithStats[]) => {
  const [rows, setRows] = useState<WeakTopicRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchWeakTopics = useCallback(async () => {
    if (courses.length === 0) return;
    setIsLoading(true);
    try {
      const results = await Promise.all(
        courses.map((c) => teacherAnalyticsApi.getCourseAnalytics(c.id))
      );

      const allRows: WeakTopicRow[] = [];

      results.forEach((res, i) => {
        const course = courses[i];
        const aggregates: Record<number, { title: string; sum: number; count: number }> = {};

        res.data.heatmap.forEach((row) => {
          row.topics.forEach((t) => {
            if (!aggregates[t.topic_id]) {
              aggregates[t.topic_id] = { title: t.topic_title, sum: 0, count: 0 };
            }
            aggregates[t.topic_id].sum += t.progress_pct;
            aggregates[t.topic_id].count += 1;
          });
        });

        Object.entries(aggregates).forEach(([topicId, agg]) => {
          allRows.push({
            id: Number(topicId),
            title: agg.title,
            courseId: course.id,
            courseTitle: course.title,
            masteryPercent: Math.round(agg.sum / agg.count),
            studentCount: res.data.heatmap.length,
          });
        });
      });

      allRows.sort((a, b) => a.masteryPercent - b.masteryPercent);
      setRows(allRows);
    } catch (err: unknown) {
      showToast(
        ToastTypeEnum.ERROR,
        'Помилка',
        getErrorMessage(err, 'Не вдалося завантажити теми')
      );
    } finally {
      setIsLoading(false);
    }
  }, [courses]);

  useEffect(() => {
    const load = async () => {
      await fetchWeakTopics();
    };
    load();
  }, [fetchWeakTopics]);

  return { rows, isLoading };
};
