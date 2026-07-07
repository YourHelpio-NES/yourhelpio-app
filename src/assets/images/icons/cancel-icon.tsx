import type { ImageType } from '../../shared/constants/image';
import { COLORS } from '../../styles/colors';

export const CancelIcon = ({
  color = COLORS.text,
  size = 28,
  withBorder = true,
}: ImageType & { withBorder?: boolean }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      {withBorder && <circle cx="14" cy="14" r="12" stroke={color} strokeWidth={1.5} />}

      <path d="M10 10L18 18" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M18 10L10 18" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
};
