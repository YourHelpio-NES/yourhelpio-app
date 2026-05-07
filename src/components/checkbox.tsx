import { type Dispatch, type FC, type ReactNode, type SetStateAction } from 'react';
import styled, { keyframes } from 'styled-components';
import { COLORS } from '../assets/styles/colors';
import { DoneIcon } from '../assets/images/icons/done-icon';

const pop = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }

  70% {
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
  border: 2px solid #7c3aed;
  border-radius: 6px;
  object-fit: contain;
  background: transparent;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: all 0.25s ease;

  svg {
    width: 100%;
    height: 100%;
    fill: none;

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
