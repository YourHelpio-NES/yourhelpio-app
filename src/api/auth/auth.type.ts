export enum UserRoleEnum {
  TEACHER = 'teacher',
  STUDENT = 'student',
}

export type UserRole = (typeof UserRoleEnum)[keyof typeof UserRoleEnum];

export interface UserEntity {
  id: number;
  email: string;
  full_name: string;
  role: UserRole;
}

export interface RegisterPayload {
  email: string;
  password: string;
  full_name: string;
  role: UserRole;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  user: UserEntity;
}

export interface ChangePasswordPayload {
  current_password: string;
  new_password: string;
}
