import type { ImageType } from '../../shared/constants/image';
import { COLORS } from '../../styles/colors';
import { ROTATION_ARROW_ICON, type DirectionArrowIcon } from './arrow-icon';

export const ChevronIcon = ({
  color = COLORS.text,
  size = 24,
  direction = 'left',
}: ImageType & { direction?: DirectionArrowIcon }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform: `rotate(${ROTATION_ARROW_ICON[direction]}deg)`,
        transition: 'transform 0.2s ease',
      }}
    >
      <path
        d="M15.4997 20L8.9168 13.0607C8.78466 12.9214 8.67984 12.756 8.60832 12.574C8.53681 12.392 8.5 12.197 8.5 12C8.5 11.803 8.53681 11.608 8.60832 11.426C8.67984 11.244 8.78466 11.0786 8.9168 10.9393L15.5 4"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
