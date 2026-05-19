import { COLORS } from '../../styles/colors';

export enum DifficultyEnum {
  HIGH = 'Високий',
  MEDIUM = 'Середній',
  LOW = 'Низький',
}

export const difficultyTypeData: Record<DifficultyEnum, { order: number; color: string }> = {
  [DifficultyEnum.HIGH]: { order: 1, color: COLORS.status.error },
  [DifficultyEnum.MEDIUM]: { order: 2, color: COLORS.status.warning },
  [DifficultyEnum.LOW]: { order: 3, color: COLORS.status.success },
};
