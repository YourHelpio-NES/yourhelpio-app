import type { AllowedFileType, FileUploadConfig } from './upload.type';

export function formatFileSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

export function validateFile(file: File, config: FileUploadConfig): string | null {
  const sizeMb = file.size / (1024 * 1024);
  if (sizeMb > config.maxSizeMb) {
    return `Файл "${file.name}" перевищує ${config.maxSizeMb}MB`;
  }
  if (!config.allowedTypes.includes(file.type as AllowedFileType)) {
    return `Файл "${file.name}" має непідтримуваний формат`;
  }
  return null;
}

export function getFileIcon(file: File): 'docs' | 'pdf' | 'image' | 'link' | 'generic' {
  if (file.type === 'text/uri-list') return 'link';
  if (file.type.includes('pdf')) return 'pdf';
  if (file.type.includes('word') || file.name.endsWith('.docx') || file.name.endsWith('.doc'))
    return 'docs';
  if (file.type.includes('image')) return 'image';
  return 'generic';
}

// Мок-завантаження — замінити на реальний axios/fetch з onUploadProgress
export function mockUpload(onProgress: (pct: number) => void, onDone: () => void): () => void {
  let pct = 0;
  const interval = setInterval(() => {
    pct += Math.random() * 15;
    if (pct >= 100) {
      clearInterval(interval);
      onProgress(100);
      onDone();
    } else {
      onProgress(Math.min(Math.round(pct), 99));
    }
  }, 300);

  // повертає cancel-функцію
  return () => clearInterval(interval);
}
