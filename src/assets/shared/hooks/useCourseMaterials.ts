import { useCallback, useState } from 'react';
import type { MaterialCourse } from '../../../api/courses/details.types';
import { coursesApi } from '../../../api/courses/courses.api';
import showToast from '../../../components/toast/show';
import { ToastTypeEnum } from '../constants/custom-toast';
import { getErrorMessage } from '../utils/getErrorMessage';

export const useCourseMaterials = () => {
  const [materials, setMaterials] = useState<MaterialCourse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchMaterials = useCallback(async (id: number) => {
    setIsLoading(true);
    try {
      const { data } = await coursesApi.getStudentMaterials(id);
      setMaterials(data.materials);
    } catch (err: unknown) {
      showToast(
        ToastTypeEnum.ERROR,
        'Помилка завантаження',
        getErrorMessage(err, 'Не вдалося завантажити матеріали курсу')
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { materials, isLoading, refetch: fetchMaterials };
};
