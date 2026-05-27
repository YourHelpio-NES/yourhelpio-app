import styled from 'styled-components';
import { COLORS } from '../assets/styles/colors';
import { basicShadow } from './blocks';
import { TextBody } from '../assets/styles/typography';
import * as RadixSelect from '@radix-ui/react-select';
import { useState } from 'react';
import { ChevronIcon } from '../assets/images/icons/chevron-icon';

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  errorText?: string;
  label?: string;
}

export const Select = ({ options, value, onChange, disabled, errorText, label }: SelectProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <SelectWrapper>
      {label && (
        <TextBody $label $color={COLORS.secondary}>
          {label}
        </TextBody>
      )}

      <RadixSelect.Root
        value={value}
        onValueChange={onChange}
        disabled={disabled}
        open={open}
        onOpenChange={setOpen}
      >
        {' '}
        <SelectTrigger $hasError={!!errorText}>
          <RadixSelect.Value />

          <RadixSelect.Icon>
            <ChevronIcon direction={open ? 'up' : 'down'} size={20} color={COLORS.secondaryDark} />
          </RadixSelect.Icon>
        </SelectTrigger>
        <RadixSelect.Portal>
          <SelectContent position="popper" sideOffset={4}>
            <RadixSelect.Viewport>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <RadixSelect.ItemText>
                    <TextBody $label={option.value === value}>{option.label}</TextBody>
                  </RadixSelect.ItemText>
                </SelectItem>
              ))}
            </RadixSelect.Viewport>
          </SelectContent>
        </RadixSelect.Portal>
      </RadixSelect.Root>

      {errorText && (
        <TextBody $label $color={COLORS.status.error}>
          {errorText}
        </TextBody>
      )}
    </SelectWrapper>
  );
};

const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: auto;
`;

const SelectTrigger = styled(RadixSelect.Trigger)<{ $hasError?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-radius: 24px;
  gap: 8px;
  border: 1px solid ${({ $hasError }) => ($hasError ? COLORS.status.error : COLORS.secondary)};
  background-color: ${COLORS.lighterBg};
  cursor: pointer;
  outline: none;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: ${COLORS.secondaryDark};
  }

  &:focus {
    border-color: ${COLORS.secondaryDark};
  }

  &[data-disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SelectContent = styled(RadixSelect.Content)`
  width: var(--radix-select-trigger-width);
  background-color: ${COLORS.lighterBg};
  border-radius: 12px;
  border: 1px solid ${COLORS.secondary};
  overflow: hidden;
  z-index: 999;
  ${basicShadow};
`;

const SelectItem = styled(RadixSelect.Item)`
  padding: 10px 16px;
  cursor: pointer;
  outline: none;
  transition: background-color 0.15s ease;

  &[data-highlighted] {
    opacity: 0.8;
  }

  &[data-state='checked'] {
    background-color: ${COLORS.boxShadow};
    ${TextBody} {
      color: ${COLORS.secondaryDark};
    }
  }
`;
