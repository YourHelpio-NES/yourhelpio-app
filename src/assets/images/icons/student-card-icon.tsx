import type { ImageType } from '../../shared/constants/image';
import { COLORS } from '../../styles/colors';

export const StudentCardIcon = ({ color = COLORS.text, size = 30 }: ImageType) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.25 13.75C12.6307 13.75 13.75 12.6307 13.75 11.25C13.75 9.86929 12.6307 8.75 11.25 8.75C9.86929 8.75 8.75 9.86929 8.75 11.25C8.75 12.6307 9.86929 13.75 11.25 13.75Z"
        stroke={color}
        stroke-width="1.5"
      />
      <path
        d="M16.25 18.75C16.25 20.1313 16.25 21.25 11.25 21.25C6.25 21.25 6.25 20.1313 6.25 18.75C6.25 17.3687 8.4875 16.25 11.25 16.25C14.0125 16.25 16.25 17.3687 16.25 18.75Z"
        stroke={color}
        stroke-width="1.5"
      />
      <path
        d="M2.5 15C2.5 10.2863 2.5 7.92875 3.965 6.465C5.43 5.00125 7.78625 5 12.5 5H17.5C22.2137 5 24.5712 5 26.035 6.465C27.4987 7.93 27.5 10.2863 27.5 15C27.5 19.7137 27.5 22.0712 26.035 23.535C24.57 24.9987 22.2137 25 17.5 25H12.5C7.78625 25 5.42875 25 3.965 23.535C2.50125 22.07 2.5 19.7137 2.5 15Z"
        stroke={color}
        stroke-width="1.5"
      />
      <path
        d="M23.75 15H18.75M23.75 11.25H17.5M23.75 18.75H20"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </svg>
  );
};
