import {
  flip,
  FloatingPortal,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useTransitionStyles,
} from '@floating-ui/react';
import { useState } from 'react';
import styled from 'styled-components';
import { Button } from './button';
import { COLORS } from '../assets/styles/colors';
import { UserIcon } from '../assets/images/icons/user';
import { SmallText, TextBody } from '../assets/styles/typography';
import { basicShadow } from './blocks';
import { ExitIcon } from '../assets/images/icons/exit-icon';
import { Divider } from '../pages/notification';

interface User {
  firstName: string;
  fullName: string;
  email: string;
  role: string;
}

interface UserProfileDropdownProps {
  user: User;
  onLogout: () => void;
}

const DropdownCard = styled.div<{ $visible: boolean }>`
  max-width: 280px;
  background: ${COLORS.lighterBg};
  border: 0.5px solid ${COLORS.boxShadow};
  border-radius: 14px;
  ${basicShadow};
  padding: 18px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  z-index: 200;
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;

  ${Button} {
    margin-left: auto;
  }
`;

export const UserProfileDropdown = ({ user, onLogout }: UserProfileDropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { refs, floatingStyles, context, isPositioned } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(16), flip(), shift({ padding: 8 })],
    placement: 'bottom-end',
  });

  const { styles } = useTransitionStyles(context);

  const click = useClick(context);
  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss]);

  return (
    <>
      <Button
        className="gap-2"
        $bgColor={COLORS.lighterBg}
        $iconSize={32}
        $txtColor={COLORS.text}
        $brColor={isPositioned ? COLORS.accent : COLORS.secondary}
        ref={refs.setReference}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        {...getReferenceProps()}
      >
        <UserIcon isCircle circleColor={COLORS.accent} color={COLORS.background} size={32} />
        <TextBody $color={COLORS.text} $label>
          {user.firstName}
        </TextBody>
      </Button>

      {isOpen && (
        <FloatingPortal>
          <DropdownCard
            // eslint-disable-next-line react-hooks/refs
            ref={refs.setFloating}
            style={{
              ...floatingStyles,
              ...styles,

              opacity: isPositioned ? 1 : 0,
              visibility: isPositioned ? 'visible' : 'hidden',
            }}
            $visible={isPositioned}
            {...getFloatingProps()}
          >
            <SmallText>Профіль:</SmallText>
            <TextBody $label $color={COLORS.text}>
              {user.fullName}
            </TextBody>
            <TextBody $medium $color={COLORS.secondary}>
              {user.email}
            </TextBody>
            <SmallText>{user.role}</SmallText>

            <Divider />

            <Button
              $type="small"
              $brColor={COLORS.primary}
              $bgColor={COLORS.primary}
              $txtColor={COLORS.lighterBg}
              $iconSize={18}
              onClick={onLogout}
            >
              <ExitIcon color={COLORS.background} size={16} />
              <SmallText>Вихід</SmallText>
            </Button>
          </DropdownCard>
        </FloatingPortal>
      )}
    </>
  );
};
