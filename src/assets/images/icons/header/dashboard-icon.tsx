import type { ImageType } from '../../../shared/constants/image';
import { COLORS } from '../../../styles/colors';

export const DashboardIcon = ({ color = COLORS.text, size = 22 }: ImageType) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.75 13.75V15.125H5.90288L1.375 19.6529L2.34713 20.625L6.875 16.0971V19.25H8.25V13.75H2.75ZM16.5 14.4375H17.875V17.875H16.5V14.4375ZM13.75 11H15.125V17.875H13.75V11ZM11 12.375H12.375V17.875H11V12.375Z"
        fill={color}
      />
      <path
        d="M19.25 1.375H2.75C2.38533 1.375 2.03559 1.51987 1.77773 1.77773C1.51987 2.03559 1.375 2.38533 1.375 2.75V11H2.75V8.9375H19.2507L19.2514 19.25H11V20.625H19.25C19.6145 20.6245 19.9639 20.4794 20.2217 20.2217C20.4794 19.9639 20.6245 19.6145 20.625 19.25V2.75C20.625 2.38533 20.4801 2.03559 20.2223 1.77773C19.9644 1.51987 19.6147 1.375 19.25 1.375ZM8.25 7.5625H2.75V2.75H8.25V7.5625ZM9.625 7.5625V2.75H19.25V7.5625H9.625Z"
        fill={color}
      />
    </svg>
  );
};
