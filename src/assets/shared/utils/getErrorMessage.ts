import { isAxiosError } from 'axios';

interface ApiErrorResponse {
  error: string;
}

export const getErrorMessage = (
  err: unknown,
  fallback = 'Щось пішло не так. Спробуйте ще раз.'
): string => {
  if (isAxiosError<ApiErrorResponse>(err)) {
    return err.response?.data?.error ?? fallback;
  }
  return fallback;
};
