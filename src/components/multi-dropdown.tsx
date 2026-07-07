import * as Popover from '@radix-ui/react-popover';
import styled from 'styled-components';
import type { SelectOption } from './dropdown';
import { COLORS } from '../assets/styles/colors';
import { TextBody } from '../assets/styles/typography';
import { Checkbox } from './checkbox';
import { useMemo, useState } from 'react';
import { ChevronIcon } from '../assets/images/icons/chevron-icon';
import { basicShadow } from './blocks';
import { CloseIcon } from '../assets/images/icons/close-icon';
import { BREAKPOINTS, media } from '../assets/styles/breakpoints';

interface MultiSelectProps {
  options: SelectOption[];

  value: string[];

  onChange: (value: string[]) => void;

  placeholder?: string;

  disabled?: boolean;

  errorText?: string;

  label?: string;

  sublabel?: string;

  width?: string;
}

export const MultiSelect = ({
  options,
  value,
  onChange,
  placeholder = 'Оберіть значення',
  errorText,
  label,
  sublabel,
  width,
}: MultiSelectProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const selectedOptions = useMemo(
    () => options.filter((option) => value.includes(option.value)),
    [options, value]
  );

  const toggleValue = (selectedValue: string) => {
    if (value.includes(selectedValue)) {
      onChange(value.filter((item) => item !== selectedValue));
      return;
    }

    onChange([...value, selectedValue]);
  };

  const removeChip = (e: React.MouseEvent, selectedValue: string) => {
    e.stopPropagation();

    onChange(value.filter((item) => item !== selectedValue));
  };

  return (
    <MultiSelectWrapper $width={width}>
      {label && <TextBody $label>{label}</TextBody>}

      {sublabel && <TextBody>{sublabel}</TextBody>}

      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild>
          <Trigger $hasError={!!errorText}>
            <ChipsContainer>
              {selectedOptions.length === 0 ? (
                <Placeholder>{placeholder}</Placeholder>
              ) : (
                selectedOptions.map((option) => (
                  <Chip key={option.value} onClick={(e) => removeChip(e, option.value)}>
                    <TextBody>{option.label}</TextBody>
                    <CloseIcon color={COLORS.secondary} />
                  </Chip>
                ))
              )}
            </ChipsContainer>

            <ChevronIcon direction={open ? 'up' : 'down'} color={COLORS.secondaryDark} />
          </Trigger>
        </Popover.Trigger>

        <Popover.Portal>
          <PopoverContent sideOffset={4}>
            <OptionsContainer>
              {options.map((option) => (
                <OptionItem key={option.value}>
                  <Checkbox
                    checked={value.includes(option.value)}
                    setChecked={() => {
                      toggleValue(option.value);
                    }}
                  >
                    <TextBody>{option.label}</TextBody>
                  </Checkbox>
                </OptionItem>
              ))}
            </OptionsContainer>
          </PopoverContent>
        </Popover.Portal>
      </Popover.Root>

      {errorText && <TextBody $color={COLORS.status.error}>{errorText}</TextBody>}
    </MultiSelectWrapper>
  );
};

export const Trigger = styled.div<{ $hasError?: boolean }>`
  width: 100%;
  min-height: 42px;
  padding: 8px 12px;
  border-radius: 24px;
  border: 1px solid ${({ $hasError }) => ($hasError ? COLORS.status.error : COLORS.secondary)};
  background: ${COLORS.lighterBg};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    border-color: ${COLORS.accent};
  }

  &:focus-visible {
    outline: none;
    border-color: ${COLORS.accent};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const ChipsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  flex: 1;
  overflow: hidden;
`;

export const Placeholder = styled.span`
  color: ${COLORS.secondary};
  user-select: none;
`;

export const Chip = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 3px 10px;
  border: none;
  border-radius: 20px;
  background: ${COLORS.background};
  border: 1px solid ${COLORS.boxShadow};
  cursor: pointer;
  transition: 0.2s;
  white-space: nowrap;

  ${TextBody} {
    color: ${COLORS.accent};
  }

  &:hover {
    background: ${COLORS.primaryShadow};
    ${TextBody} {
      color: ${COLORS.text};
    }
  }
`;

export const ChipRemove = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 1;
`;

export const PopoverContent = styled(Popover.Content)`
  width: var(--radix-popover-trigger-width);
  background: ${COLORS.lighterBg};
  border-radius: 12px;
  border: 1px solid ${COLORS.secondary};
  ${basicShadow};
  padding: 8px;
  z-index: 100;
`;

export const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  max-height: 260px;
  overflow-y: auto;
`;

export const OptionItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: ${COLORS.background};
  }

  ${media(BREAKPOINTS.xs)} {
    padding: 4px 8px;
  }
`;

export const SearchWrapper = styled.div`
  margin-bottom: 8px;
`;

export const SearchInput = styled.input`
  width: 100%;

  height: 40px;

  border-radius: 8px;

  border: 1px solid ${COLORS.secondary};

  padding: 0 12px;

  outline: none;

  &:focus {
    border-color: ${COLORS.accent};
  }
`;

export const EmptyState = styled.div`
  padding: 16px;

  text-align: center;

  color: ${COLORS.secondary};
`;

export const MultiSelectWrapper = styled.div<{ $width?: string }>`
  width: ${({ $width }) => $width ?? '100%'};

  display: flex;
  flex-direction: column;
  gap: 8px;

  ${media(BREAKPOINTS.xs)} {
    ${Trigger} {
      padding: 4px 12px;
    }
    ${OptionItem} {
      padding: 4px 8px;
    }
    ${PopoverContent} {
      padding: 4px;
    }
  }
`;
