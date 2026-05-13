import { type Dispatch, type FC, type ReactNode, type SetStateAction } from 'react';
import styled, { keyframes } from 'styled-components';
import { COLORS } from '../assets/styles/colors';
import { DoneIcon } from '../assets/images/icons/done-icon';

const pop = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }

  50% {
    transform: scale(1.2);
    opacity: 1;
  }

  100% {
    transform: scale(1);
  }
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  display: none;
`;

const CustomCheckbox = styled.div<{ checked: boolean }>`
  width: 24px;
  height: 24px;

  box-sizing: border-box;

  border: 2px solid ${COLORS.secondary};
  border-radius: 6px;

  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  background: transparent;
  cursor: pointer;

  transition:
    border-color 0.2s ease,
    background-color 0.2s ease,
    transform 0.15s ease;

  &:active {
    transform: scale(0.95);
  }

  svg {
    width: 18px;
    height: 18px;

    animation: ${({ checked }) => (checked ? pop : 'none')} 0.25s ease;
  }
`;

export interface CheckboxType {
  checked: boolean;
  setChecked: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}

export const Checkbox: FC<CheckboxType> = ({ checked, setChecked, children }) => {
  return (
    <Label>
      <HiddenCheckbox checked={checked} onChange={() => setChecked(!checked)} />

      <CustomCheckbox checked={checked}>
        {checked && <DoneIcon color={COLORS.secondary} />}
      </CustomCheckbox>

      {children}
    </Label>
  );
};
