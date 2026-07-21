import { axiosInstance } from '../axios-instance';
import type { GetScheduleParams, ScheduleResponse } from './schedule.types';

export const scheduleApi = {
  getSchedule: (params?: GetScheduleParams) =>
    axiosInstance.get<ScheduleResponse>('/analytics/student/schedule', {
      params: { days: params?.days ?? 14 },
    }),
};
