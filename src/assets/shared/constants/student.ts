export interface StudentTopic {
  id: number;
  fullName: string;
  email: string;
  group: string;
  progress: number | null;
  status: StudentStatus;
}

export enum StudentStatusEnum {
  IN_PROGRESS = 'in_progress',
  NOT_STARTED = 'not_started',
  NOT_ASSIGNED = 'not_assigned',
  COMPLETED = 'completed',
}

export interface StudentMain {
  id: number;
  fullName: string;
  email: string;
  group: string;
}

export type StudentStatus = 'in_progress' | 'not_started' | 'not_assigned' | 'completed';
