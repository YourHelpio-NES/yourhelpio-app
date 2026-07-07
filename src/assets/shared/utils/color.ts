import { COLORS } from '../../styles/colors';

export const getColorByPercentage = (value: number): string => {
  if (value < 27) return COLORS.status.error;
  if (value > 81) return COLORS.status.success;
  return COLORS.status.warning;
};
