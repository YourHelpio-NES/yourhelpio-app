import type { ImageType } from '../../shared/constants/image';
import { COLORS } from '../../styles/colors';

export const ROTATION_ARROW_ICON = {
  left: 0,
  right: 180,
  up: 90,
  down: -90,
} as const;

export type DirectionArrowIcon = keyof typeof ROTATION_ARROW_ICON;

export const ArrowIcon = ({
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.5 12.214C5.5 11.9488 5.60536 11.6944 5.79289 11.5069C5.98043 11.3193 6.23478 11.214 6.5 11.214H19C19.2652 11.214 19.5196 11.3193 19.7071 11.5069C19.8946 11.6944 20 11.9488 20 12.214C20 12.4792 19.8946 12.7336 19.7071 12.9211C19.5196 13.1086 19.2652 13.214 19 13.214H6.5C6.23478 13.214 5.98043 13.1086 5.79289 12.9211C5.60536 12.7336 5.5 12.4792 5.5 12.214Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 12.214C4.00006 11.9488 4.10545 11.6945 4.293 11.507L8.793 7.00701C8.88525 6.9115 8.99559 6.83532 9.1176 6.78291C9.2396 6.7305 9.37082 6.70291 9.5036 6.70176C9.63638 6.70061 9.76806 6.72591 9.89095 6.77619C10.0139 6.82647 10.1255 6.90072 10.2194 6.99461C10.3133 7.08851 10.3875 7.20016 10.4378 7.32306C10.4881 7.44595 10.5134 7.57763 10.5123 7.71041C10.5111 7.84319 10.4835 7.97441 10.4311 8.09641C10.3787 8.21842 10.3025 8.32876 10.207 8.42101L6.414 12.214L10.207 16.007C10.3892 16.1956 10.49 16.4482 10.4877 16.7104C10.4854 16.9726 10.3802 17.2234 10.1948 17.4088C10.0094 17.5942 9.7586 17.6994 9.4964 17.7017C9.2342 17.704 8.9816 17.6032 8.793 17.421L4.293 12.921C4.10545 12.7335 4.00006 12.4792 4 12.214Z"
        fill={color}
      />
    </svg>
  );
};
