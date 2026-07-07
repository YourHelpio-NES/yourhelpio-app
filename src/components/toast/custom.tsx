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
import { BREAKPOINTS, media } from '../../assets/styles/breakpoints';

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
  align-self: stretch;
  width: 5px;
  flex-shrink: 0;
  border-radius: 10px;
  background-color: ${({ $color }) => $color};
`;

const ToastStyle = styled.div<{ $type?: string }>`
  padding: 12px;
  border-radius: 12px;
  display: flex;
  gap: 16px;
  align-items: center;
  width: fit-content;
  max-width: 500px;
  width: auto;
  background-color: ${COLORS.background};
  box-shadow: 0 2px 5px 1px ${COLORS.boxShadow};
  box-sizing: border-box;

  svg {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
  }

  button {
    flex-shrink: 0;
    svg {
      width: 18px;
    }
  }

  ${media(BREAKPOINTS.md)} {
    min-width: 50%;
    max-width: 60%;
  }
`;
