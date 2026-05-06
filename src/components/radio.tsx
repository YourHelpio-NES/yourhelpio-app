import type { Dispatch, SetStateAction } from 'react';
import type { RolesEnum } from '../assets/shared/constants/roles';
import styled from 'styled-components';
import { TextBody } from '../assets/styles/typography';
import { COLORS } from '../assets/styles/colors';

export default function RadioButton({
  value,
  label,
  selected,
  setSelected,
}: {
  value: string;
  label: string;
  selected: RolesEnum | null;
  setSelected: Dispatch<SetStateAction<RolesEnum | null>>;
}) {
  const isSelected: boolean = selected === value;

  return (
    <div
      className="d-flex align-items-center gap-2 cursor-pointer"
      key={value}
      //   className={`role-option ${selected === value ? 'selected' : ''}`}
      onClick={() => setSelected(value as RolesEnum)}
      role="radio"
      aria-checked={selected === value}
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && setSelected(value as RolesEnum)}
    >
      <Radio $selected={isSelected}>
        <RadioDot $visible={isSelected} />
      </Radio>
      <TextBody $color={COLORS.text}>{label}</TextBody>
    </div>
  );
}

const Radio = styled.div<{ $selected: boolean }>`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 2px solid ${({ $selected }) => ($selected ? COLORS.accent : COLORS.secondary)};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.15s;
  padding: 4px;
`;

const RadioDot = styled.div<{ $visible: boolean }>`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: ${COLORS.accent};
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: scale(${({ $visible }) => ($visible ? 1 : 0)});

  transition:
    transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1),
    opacity 0.15s ease-out;
`;
