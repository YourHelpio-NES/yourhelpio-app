import { useCallback, useRef, useState } from 'react';
import { mockUpload, validateFile } from '../../../components/upload-file/functionality';
import { FILE_UPLOAD_CONFIG, type UploadFile } from '../../../components/upload-file/upload.type';

export function useFileUpload() {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [dropError, setDropError] = useState<string | null>(null);
  const cancelRefs = useRef<Record<string, () => void>>({});

  const updateFile = useCallback((id: string, patch: Partial<UploadFile>) => {
    setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, ...patch } : f)));
  }, []);

  const addFiles = useCallback(
    (incoming: File[]) => {
      setDropError(null);
      const errors: string[] = [];

      incoming.forEach((file) => {
        const error = validateFile(file, FILE_UPLOAD_CONFIG);
        if (error) {
          errors.push(error);
          return;
        }

        const id = `${Date.now()}-${Math.random()}`;
        const entry: UploadFile = { id, file, status: 'uploading', progress: 0 };

        setFiles((prev) => [...prev, entry]);

        // замінити mockUpload на реальний виклик API
        const cancel = mockUpload(
          (pct) => updateFile(id, { progress: pct }),
          () => updateFile(id, { status: 'done', progress: 100 })
        );
        cancelRefs.current[id] = cancel;
      });

      if (errors.length) setDropError(errors.join('. '));
    },
    [updateFile]
  );

  const removeFile = useCallback((id: string) => {
    cancelRefs.current[id]?.();
    delete cancelRefs.current[id];
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const [linkValue, setLinkValue] = useState('');
  const [linkError, setLinkError] = useState<string | null>(null);

  const submitLink = useCallback(() => {
    setLinkError(null);
    if (!linkValue.trim()) {
      setLinkError('Вставте посилання');
      return;
    }
    if (!linkValue.startsWith('http')) {
      setLinkError('Невалідне посилання');
      return;
    }

    // витягуємо ім'я файлу з URL, або беремо домен як fallback
    const urlName = `link_file__${files.length}`;

    // створюємо фейковий File щоб структура збіглась з UploadFile
    const fakeFile = new File([], urlName, { type: 'text/uri-list' });

    const id = `link-${Date.now()}`;
    const entry: UploadFile = {
      id,
      file: fakeFile,
      status: 'uploading',
      progress: 0,
    };

    setFiles((prev) => [...prev, entry]);

    // мок-прогрес так само як для звичайного файлу
    const cancel = mockUpload(
      (pct) => updateFile(id, { progress: pct }),
      () => updateFile(id, { status: 'done', progress: 100 })
    );
    cancelRefs.current[id] = cancel;

    setLinkValue('');
  }, [linkValue, updateFile, files]);

  return {
    files,
    dropError,
    addFiles,
    removeFile,
    linkValue,
    setLinkValue,
    linkError,
    submitLink,
  };
}
