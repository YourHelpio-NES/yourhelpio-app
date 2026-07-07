import { COLORS } from '../../styles/colors';

export const BurgerIcon = ({
  color = COLORS.text,
  size = 24,
}: {
  color?: string;
  size?: number;
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.9751 5.97501H19.9751M3.9751 11.975H19.9751M3.9751 17.975H19.9751"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
