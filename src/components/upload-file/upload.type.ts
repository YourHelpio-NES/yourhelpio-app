export type FileUploadStatus = 'uploading' | 'done' | 'error';

export type AllowedFileType =
  | 'application/pdf'
  | 'application/msword'
  | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  | 'image/png'
  | 'image/jpeg';

export interface UploadFile {
  id: string;
  file: File;
  status: FileUploadStatus;
  progress: number; // 0–100
  error?: string;
}

export interface FileUploadConfig {
  maxSizeMb: number;
  allowedTypes: AllowedFileType[];
}

export const FILE_UPLOAD_CONFIG: FileUploadConfig = {
  maxSizeMb: 20,
  allowedTypes: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/png',
    'image/jpeg',
  ],
};

export const FILE_TYPE_LABEL: Record<AllowedFileType, string> = {
  'application/pdf': 'pdf',
  'application/msword': 'doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
  'image/png': 'png',
  'image/jpeg': 'jpeg',
};

export const ALLOWED_HINT = 'pdf, docs, png, jpeg';
