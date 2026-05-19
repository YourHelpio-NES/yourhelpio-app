import type { ImageType } from '../../../shared/constants/image';
import { COLORS } from '../../../styles/colors';

export const MapIcon = ({ color = COLORS.text, size = 22 }: ImageType) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.1003 15.5833V8.25M2.93359 15.5833H6.60026V19.25H2.93359V15.5833ZM4.76693 2.75H19.4336V8.25H4.76693V2.75Z"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.76709 15.5833V11.9167H19.4338V15.5833M7.51709 5.5H8.43376M17.6004 15.5833H21.2671V19.25H17.6004V15.5833ZM10.2671 15.5833H13.9338V19.25H10.2671V15.5833Z"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
