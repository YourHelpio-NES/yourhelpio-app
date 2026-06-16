import { useState, type Dispatch, type SetStateAction } from 'react';
import { InputTypeEnum } from '../assets/shared/constants/input';
import { fontType, SmallText, TextBody } from '../assets/styles/typography';
import styled from 'styled-components';
import { PasswordIcon } from '../assets/images/icons/password-icon';
import { COLORS } from '../assets/styles/colors';

interface InputType {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  placeholder?: string;
  label?: string;
  errorText?: string;
  type: InputTypeEnum;
  onBlur?: () => void;
}

export default function Input({
  value,
  setValue,
  placeholder,
  label,
  errorText,
  type,
  onBlur,
}: InputType) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <InputStyle>
      {label && <TextBody $label>{label}</TextBody>}
      <span>
        <input
          id={type}
          name={type}
          placeholder={placeholder}
          type={
            !type.includes(InputTypeEnum.PASSWORD)
              ? type
              : showPassword
                ? InputTypeEnum.TEXT
                : InputTypeEnum.PASSWORD
          }
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          onBlur={onBlur}
          autoComplete={type.includes(InputTypeEnum.PASSWORD) ? 'current-password' : type}
        />
        {type.includes(InputTypeEnum.PASSWORD) && (
          <PasswordIcon showPassword={showPassword} setShowPassword={setShowPassword} />
        )}
      </span>
      {errorText && <SmallText $medium>{errorText}</SmallText>}
    </InputStyle>
  );
}

export const InputStyle = styled.span`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  span {
    width: 100%;
    border: 1px solid ${COLORS.secondary};
    padding: 10px 20px;
    border-radius: 32px;
    display: flex;
    align-items: center;

    &:focus-within {
      border-color: ${COLORS.primary};
      box-shadow: 0 0 0 4px ${COLORS.primaryShadow};
      transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
    }

    input {
      border: none;
      outline: none;
      background-color: transparent;
      width: 100%;
      caret-color: ${COLORS.text};
      ${fontType};
      ${TextBody.componentStyle.rules};
    }

    svg {
      width: 24px;
      height: 24px;

      &:active {
        transform: scale(1.1);
        transition: transform 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
      }
    }
  }

  ${TextBody} {
    color: ${COLORS.text};
  }
  ${SmallText} {
    color: ${COLORS.status.error};
    margin-top: -4px;
  }
`;
