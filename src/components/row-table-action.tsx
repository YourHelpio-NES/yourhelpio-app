import {
  autoUpdate,
  flip,
  FloatingPortal,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
} from '@floating-ui/react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  TopicDetailsStatusEnum,
  type TopicDetailTeacherRow,
} from '../assets/shared/constants/details-course';
import { COLORS } from '../assets/styles/colors';
import { basicShadow } from './blocks';
import { Button } from './button';
import { EditIcon } from '../assets/images/icons/edit-icon';
import { SmallText, TextBody } from '../assets/styles/typography';
import { DeleteIcon } from '../assets/images/icons/delete-icon';
import { DotsIcon } from '../assets/images/icons/dots-icon';

interface RowActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export interface TopicTableMeta {
  onEdit: (row: TopicDetailTeacherRow) => void;
  onDelete: (row: TopicDetailTeacherRow) => void;
}

const TriggerBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: transparent;
  cursor: pointer;
  color: var(--color-text-secondary);
  transition:
    opacity 0.15s ease-in,
    background 0.15s ease-in;

  &:hover {
    opacity: 0.8;
  }

  &:active,
  &:focus {
    background-color: ${COLORS.primaryShadow};
  }
`;

const Menu = styled.div<{ $visible: boolean }>`
  min-width: 180px;
  background: ${COLORS.background};
  border: 0.5px solid ${COLORS.secondary};
  border-radius: 12px;
  ${basicShadow};
  padding: 12px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 8px;

  visibility: ${({ $visible }) => ($visible ? 'visible' : 'hidden')};
`;

export const RowTableActions = ({ onEdit, onDelete }: RowActionsProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { refs, floatingStyles, context, isPositioned } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    middleware: [offset(10), flip(), shift({ padding: 8 })],
    placement: 'bottom-end',
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss]);

  const handleEdit = () => {
    setIsOpen(false);
    onEdit();
  };

  const handleDelete = () => {
    setIsOpen(false);
    onDelete();
  };

  useEffect(() => {
    console.log('OPEN', isOpen);
  }, [isOpen]);

  const handleTriggerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <>
      <TriggerBtn
        ref={(node) => {
          refs.setReference(node);
        }}
        aria-label="Дії з рядком"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={handleTriggerClick}
        {...getReferenceProps({
          onClick: (e) => e.stopPropagation(),
        })}
      >
        <DotsIcon size={22} color={COLORS.placeholder} />
      </TriggerBtn>

      {isOpen && (
        <FloatingPortal>
          <Menu
            ref={(node) => {
              refs.setFloating(node);
            }}
            style={floatingStyles}
            $visible={isPositioned}
            role="menu"
            {...getFloatingProps()}
          >
            <Button
              type={'small'}
              $bgColor={COLORS.accent}
              $txtColor={COLORS.lighterBg}
              $brWidth="2"
              width="100%"
              onClick={handleEdit}
            >
              <EditIcon color={COLORS.lighterBg} />
              <TextBody $medium>Редагувати</TextBody>
            </Button>
            <Button
              type={'small'}
              $bgColor={COLORS.lighterBg}
              $txtColor={COLORS.status.error}
              $brColor={COLORS.status.error}
              width="100%"
              $brWidth="2"
              onClick={handleDelete}
            >
              <DeleteIcon color={COLORS.status.error} />
              <TextBody $medium>Видалити</TextBody>
            </Button>
          </Menu>
        </FloatingPortal>
      )}
    </>
  );
};

export const StatusTopicButton = ({
  status,
  width = '100%',
}: {
  status: TopicDetailsStatusEnum;
  width?: string;
}) => {
  const activeColor =
    status === TopicDetailsStatusEnum.APPROVED
      ? COLORS.status.success
      : status === TopicDetailsStatusEnum.DONE
        ? COLORS.status.info
        : status === TopicDetailsStatusEnum.IN_PROGRESS
          ? COLORS.status.warning
          : status === TopicDetailsStatusEnum.NO_MATERIALS && COLORS.secondary;
  return (
    <Button
      $bgColor={'transparent'}
      $txtColor={activeColor || COLORS.secondary}
      $brColor={activeColor || COLORS.secondary}
      $brWidth={'2'}
      width={width}
      type="small"
      className={width === '100%' ? 'px-2' : ''}
    >
      <SmallText className="text-nowrap" $medium>
        {status ?? '—'}
      </SmallText>
    </Button>
  );
};
