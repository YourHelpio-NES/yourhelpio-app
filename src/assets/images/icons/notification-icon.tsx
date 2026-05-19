import { COLORS } from '../../styles/colors';

export const NotificationIcon = ({
  isItems = false,
  color = COLORS.text,
  size = 27,
}: {
  isItems?: boolean;
  color?: string;
  size?: number;
}) => {
  return (
    <svg
      width={size}
      height={size + 1}
      viewBox="0 0 27 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 23V14C6 12.4087 6.63214 10.8826 7.75736 9.75736C8.88258 8.63214 10.4087 8 12 8C13.5913 8 15.1174 8.63214 16.2426 9.75736C17.3679 10.8826 18 12.4087 18 14V23M6 23H18M6 23H4M18 23H20M11 26H13"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 8C12.5523 8 13 7.55228 13 7C13 6.44772 12.5523 6 12 6C11.4477 6 11 6.44772 11 7C11 7.55228 11.4477 8 12 8Z"
        stroke={color}
        strokeWidth="2"
      />
      {isItems && <circle cx="22" cy="5" r="5" fill="#EE845A" />}
    </svg>
  );
};
