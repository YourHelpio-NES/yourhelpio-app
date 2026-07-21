import { useCallback, useState } from 'react';
import { coursesApi } from '../../../api/courses/courses.api';
import showToast from '../../../components/toast/show';
import { ToastTypeEnum } from '../constants/custom-toast';
import { getErrorMessage } from '../utils/getErrorMessage';

export const useDownloadMaterial = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const download = useCallback(async (courseId: number, materialId: number, filename: string) => {
    setIsLoading(true);
    try {
      const response = await coursesApi.downloadMaterial(courseId, materialId);

      // створюємо тимчасове посилання і клікаємо по ньому — стандартний спосіб
      // "зкачати" blob у браузері без відкриття нової вкладки
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err: unknown) {
      showToast(
        ToastTypeEnum.ERROR,
        'Помилка завантаження',
        getErrorMessage(err, 'Не вдалося завантажити файл')
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { download, isLoading };
};
