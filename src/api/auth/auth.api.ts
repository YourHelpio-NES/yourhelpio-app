import { axiosInstance } from '../axios-instance';
import type {
  AuthResponse,
  ChangePasswordPayload,
  LoginPayload,
  RegisterPayload,
  UserEntity,
} from './auth.type';

export const authApi = {
  register: (payload: RegisterPayload) =>
    axiosInstance.post<{ message: string; user: UserEntity }>('/auth/register', payload),

  login: (payload: LoginPayload) => axiosInstance.post<AuthResponse>('/auth/login', payload),

  getMe: () => axiosInstance.get<{ user: UserEntity }>('/auth/me'),

  updateMe: (full_name: string) =>
    axiosInstance.patch<{ user: UserEntity }>('/auth/me', { full_name }),

  changePassword: (payload: ChangePasswordPayload) =>
    axiosInstance.post<{ message: string }>('/auth/me/change-password', payload),
};
