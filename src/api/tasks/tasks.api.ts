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
