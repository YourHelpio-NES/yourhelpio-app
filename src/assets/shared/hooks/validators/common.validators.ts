export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const passwordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
export const requiredField = 'Це поле є обов’язковим';

export const isRequired = (value: string) => {
  return value.trim().length > 0;
};

export const isValidEmail = (email: string) => {
  return emailRegex.test(email);
};

export const minLength = (value: string, length: number) => {
  return value.trim().length >= length;
};
