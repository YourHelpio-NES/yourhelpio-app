import styled from 'styled-components';
import {
  ToastTypeEnum,
  toastTypes,
  type ToastProps,
} from '../../assets/shared/constants/custom-toast';
import { COLORS } from '../../assets/styles/colors';
import { SmallText, TextBody } from '../../assets/styles/typography';
import toast from 'react-hot-toast';
import { CloseIcon } from '../../assets/images/icons/close-icon';
import { Button } from '../button';

const CustomToast = ({ t, type = ToastTypeEnum.INFO, title, text }: ToastProps) => {
  return (
    <ToastStyle $type={type}>
      <Line $color={COLORS.status[type as ToastTypeEnum]}></Line>
      {toastTypes[type as ToastTypeEnum]()}

      <span className="d-flex flex-column w-100">
        <TextBody $medium>{title}</TextBody>
        {text && <SmallText>{text}</SmallText>}
      </span>
      <Button
        $bgColor="transparent"
        type="text"
        onClick={() => toast.dismiss(t.id)}
        aria-label="Закрити сповіщення"
      >
        <CloseIcon color={COLORS.secondary} />
      </Button>
    </ToastStyle>
  );
};

export default CustomToast;

const Line = styled.span<{ $color?: string }>`
  display: block;
  height: 100%;
  width: 5px;
  border-radius: 10px;
  background-color: ${({ $color }) => $color};
`;

const ToastStyle = styled.div<{ $type?: string }>`
  padding: 12px;
  border-radius: 12px;
  display: flex;
  gap: 16px;
  align-items: center;
  min-width: 30%;
  max-width: 40%;
  width: auto;
  background-color: ${COLORS.background};
  box-shadow: 0 2px 5px 1px ${COLORS.boxShadow};
  box-sizing: border-box;

  svg {
    width: 32px;
    height: 32px;
  }

  button {
    svg {
      width: 18px;
    }
  }
`;
