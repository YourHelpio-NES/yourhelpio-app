import styled from 'styled-components';
import { COLORS } from '../assets/styles/colors';
import { basicShadow } from './blocks';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  id?: string;
}

const Wrapper = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  user-select: none;

  &:has(input:disabled) {
    cursor: not-allowed;
    opacity: 0.45;
  }
`;

const HiddenInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

const Thumb = styled.span`
  position: absolute;
  top: 3px;
  left: 3px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: ${COLORS.secondary};
  ${basicShadow};
  transition:
    transform 0.25s cubic-bezier(0.4, 0, 0.2, 1),
    background 0.25s ease;
`;

const Track = styled.span`
  position: relative;
  display: inline-block;
  width: 52px;
  height: 31px;
  border-radius: 99px;
  background: transparent;
  border: 2px solid ${COLORS.secondary};
  flex-shrink: 0;
  transition:
    background 0.25s ease,
    border-color 0.25s ease;

  ${HiddenInput}:checked + & {
    border-color: ${COLORS.primary};

    ${Thumb} {
      transform: translateX(22px);
      background: ${COLORS.primary};
    }
  }

  ${HiddenInput}:focus-visible + & {
    outline: 2px solid ${COLORS.primary};
    outline-offset: 2px;
  }
`;

const Label = styled.span`
  font-size: 14px;
  color: ${COLORS.boxShadow};
`;

export const Switch = ({ checked, onChange, disabled = false, label, id }: SwitchProps) => (
  <Wrapper htmlFor={id}>
    <HiddenInput
      id={id}
      type="checkbox"
      checked={checked}
      disabled={disabled}
      onChange={(e) => onChange(e.target.checked)}
    />
    <Track>
      <Thumb />
    </Track>
    {label && <Label>{label}</Label>}
  </Wrapper>
);
