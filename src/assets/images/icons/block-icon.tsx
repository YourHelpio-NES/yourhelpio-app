import type { ImageType } from '../../shared/constants/image';
import { COLORS } from '../../styles/colors';

export const BlockIcon = ({ color = COLORS.status.error, size = 24 }: ImageType) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_2974_5585)">
        <path
          d="M12 0C5.37188 0 0 5.37188 0 12C0 18.6281 5.37188 24 12 24C18.6281 24 24 18.6281 24 12C24 5.37188 18.6281 0 12 0ZM3 12C3 7.02656 7.03125 3 12 3C13.9734 3 15.7969 3.64219 17.2781 4.72031L4.72031 17.2781C3.64219 15.7969 3 13.9734 3 12ZM12 21C10.0266 21 8.20312 20.3578 6.72187 19.2797L19.2797 6.72187C20.3578 8.20781 21 10.0266 21 12C21 16.9734 16.9688 21 12 21Z"
          fill={color}
        />
      </g>
    </svg>
  );
};
