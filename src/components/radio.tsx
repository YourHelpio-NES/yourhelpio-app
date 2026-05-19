import type { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { TextBody } from '../assets/styles/typography';
import { COLORS } from '../assets/styles/colors';
import { DoneIcon } from '../assets/images/icons/done-icon';
import { BREAKPOINTS, media } from '../assets/styles/breakpoints';

export default function RadioButton<T extends string | boolean>({
  value,
  selected,
  setSelected,
  type = 'value',
}: {
  value: T;
  selected?: T | null;
  setSelected?: Dispatch<SetStateAction<T | null>>;
  label?: string;
  type?: 'state' | 'value';
}) {
  const isSelected = selected === value;

  return (
    <div
      className="d-flex align-items-center gap-2 cursor-pointer"
      onClick={() => {
        if (type === 'value') setSelected!(value!);
      }}
      role="radio"
      aria-checked={type === 'state' ? (value as boolean) : isSelected}
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && setSelected!(value!)}
    >
      <Radio className={`${type === 'state' ? 'p-0' : ''}`} $selected={isSelected}>
        {type === 'state' && value ? <DoneIcon /> : <div></div>}
      </Radio>
      {value && <TextBody $color={COLORS.text}>{value}</TextBody>}
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

  div {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: ${COLORS.accent};
    opacity: ${({ $selected }) => ($selected ? 1 : 0)};
    transform: scale(${({ $selected }) => ($selected ? 1 : 0)});

    transition:
      transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1),
      opacity 0.15s ease-out;
  }

  ${media(BREAKPOINTS.xs)} {
    width: 20px;
    height: 20px;
  }
`;

// const RadioDot = styled.div<{ $visible: boolean }>`
//   width: 100%;
//   height: 100%;
//   border-radius: 50%;
//   background: ${COLORS.accent};
//   opacity: ${({ $visible }) => ($visible ? 1 : 0)};
//   transform: scale(${({ $visible }) => ($visible ? 1 : 0)});

//   transition:
//     transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1),
//     opacity 0.15s ease-out;
// `;
