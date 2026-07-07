import type { ImageType } from '../../shared/constants/image';
import { COLORS } from '../../styles/colors';

export const FileIcon = ({ color = COLORS.text, size = 28 }: ImageType) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M23.625 11.375V21.875C23.625 22.8033 23.2563 23.6935 22.5999 24.3499C21.9435 25.0063 21.0533 25.375 20.125 25.375H7.875C6.94674 25.375 6.0565 25.0063 5.40013 24.3499C4.74375 23.6935 4.375 22.8033 4.375 21.875V6.125C4.375 4.2 5.95 2.625 7.875 2.625H14.8925"
        stroke={color}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.625 20.125H18.375M9.625 14.875H18.375M9.625 9.625H11.375M14.875 2.625L23.625 11.375H16.625C16.1609 11.375 15.7158 11.1906 15.3876 10.8624C15.0594 10.5342 14.875 10.0891 14.875 9.625V2.625Z"
        stroke={color}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
