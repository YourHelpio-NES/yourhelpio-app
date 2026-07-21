import type { StudentProgressResponse } from '../../assets/shared/constants/questions';
import { axiosInstance } from '../axios-instance';
import type {
  AnswerPayload,
  AnswerResponse,
  TasksTodayResponse,
  TopicStudentDetails,
} from './tasks.types';

export const topicsApi = {
  getTopicsToday: (topicId: number) =>
    axiosInstance.get<TasksTodayResponse>(`/topics/${topicId}/tasks/today`),

  getDetailsById: (topicId: number) => axiosInstance.get<TopicStudentDetails>(`/topics/${topicId}`),

  submitAnswer: (taskId: number, payload: AnswerPayload) =>
    axiosInstance.post<AnswerResponse>(`/tasks/${taskId}/answer`, payload),
};

export const tasksApi = {
  submitAnswer: (taskId: number, payload: AnswerPayload) =>
    axiosInstance.post<AnswerResponse>(`/tasks/${taskId}/answer`, payload),

  completeSession: (topicId: number) =>
    axiosInstance.post<StudentProgressResponse>(`/topics/${topicId}/session/complete`),

  recordTabSwitch: (topicId: number) =>
    axiosInstance.post<{ tab_switch_count: number }>(`/topics/${topicId}/tab-switch`),

  setPath: (topicId: number, path: 'BASE' | 'EXPRESS') =>
    axiosInstance.patch<StudentProgressResponse>(`/topics/${topicId}/path`, { path }),
};
