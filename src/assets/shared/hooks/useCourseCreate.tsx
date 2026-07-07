import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import type { CourseCreateContextValue, CourseFormData } from '../create-steps/type';

const CourseCreateContext = createContext<CourseCreateContextValue | null>(null);

export const CourseCreateProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<CourseFormData>({});
  const [validSteps, setValidSteps] = useState<Record<number, boolean>>({});
  const updateForm = useCallback((patch: Partial<CourseFormData>) => {
    setFormData((prev) => ({ ...prev, ...patch }));
  }, []);

  const setStepValid = useCallback((step: number, valid: boolean) => {
    setValidSteps((prev) => ({ ...prev, [step]: valid }));
  }, []);

  const isStepValid = useCallback((step: number) => !!validSteps[step], [validSteps]);

  const resetForm = useCallback(() => {
    setFormData({});
    setValidSteps({});
  }, []);

  return (
    <CourseCreateContext.Provider
      value={{ formData, updateForm, setStepValid, isStepValid, resetForm }}
    >
      {' '}
      {children}{' '}
    </CourseCreateContext.Provider>
  );
};

export const useCourseCreate = () => {
  const ctx = useContext(CourseCreateContext);
  if (!ctx) throw new Error('useCourseCreate must be used inside CourseCreateProvider');
  return ctx;
};
