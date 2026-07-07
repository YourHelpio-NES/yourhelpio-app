import { COLORS } from '../../styles/colors';

export const BlocksElementIcon = ({
  color = COLORS.text,
  size = 26,
}: {
  color?: string;
  size?: number;
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.25 4.33319H21.6667V9.74977H16.25V4.33319ZM14.0833 2.1665H23.8333V11.9165H14.0833V2.1665ZM5.41668 7.58319H10.8333V12.9998H5.41668V7.58319ZM18.4167 12.9998H13V5.4165H3.25V22.7498H20.5833V12.9998H18.4167ZM10.8333 15.1665V20.5832H5.41668V15.1665H10.8333ZM18.4167 20.5832H13V15.1665H18.4167V20.5832Z"
        fill={color}
      />
    </svg>
  );
};
