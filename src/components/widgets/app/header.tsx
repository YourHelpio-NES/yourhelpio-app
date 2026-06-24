import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  PanelItemStudentEnum,
  PanelItemTeacherEnum,
  panelStudentItems,
  panelTeacherItems,
} from '../../../assets/shared/constants/panel';
import { CardTitle } from '../../../assets/styles/typography';
import { COLORS } from '../../../assets/styles/colors';
import { BREAKPOINTS, media } from '../../../assets/styles/breakpoints';
import { BurgerIcon } from '../../../assets/images/icons/burger-icon';
import { NotificationIcon } from '../../../assets/images/icons/notification-icon';
import { UserProfileDropdown } from '../../profile-dropdown';
import { FileIcon } from '../../../assets/images/icons/file-icon';

export default function Header({
  isBurger,
  setIsCollapsed,
}: {
  isBurger: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const location = useLocation();
  const isRoleTeacher = location.pathname.includes('teacher');

  const currentPathItem = Object.keys(isRoleTeacher ? panelTeacherItems : panelStudentItems).find(
    (key) => location.pathname.includes(key)
  ) as (PanelItemTeacherEnum | PanelItemStudentEnum) | undefined;

  const navigate = useNavigate();

  const active = currentPathItem
    ? isRoleTeacher
      ? panelTeacherItems[currentPathItem as PanelItemTeacherEnum]
      : panelStudentItems[currentPathItem as PanelItemStudentEnum]
    : location.pathname.includes('notifications')
      ? { name: 'Сповіщення', icon: FileIcon }
      : (isRoleTeacher ? panelTeacherItems : panelStudentItems).dashboard;
  return (
    <HeaderStyle>
      {isBurger && (
        <BurgerButton
          onClick={() => {
            setIsCollapsed((prev) => !prev);
          }}
        >
          <BurgerIcon />
        </BurgerButton>
      )}
      <HeaderTitle>
        {active.icon({ color: COLORS.text })}
        <CardTitle>{active.name}</CardTitle>
      </HeaderTitle>
      <HeaderTitle>
        <span onClick={() => navigate('/student/notifications')}>
          <NotificationIcon
            color={location.pathname.includes('notifications') ? COLORS.accent : COLORS.text}
            size={28}
            isItems
          />
        </span>
        <UserProfileDropdown
          user={{
            firstName: 'Олена',
            fullName: 'Мельник Олена Ігорівна',
            email: 'o.i.melnyk@rcit.urk.education',
            role: 'к.т.н., доц., доцент. кандидат технічних наук',
          }}
          onLogout={() => {
            // очистити токен, редірект на /login
          }}
        />
      </HeaderTitle>
    </HeaderStyle>
  );
}

const BurgerButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 0;
  margin: 0;
  transition: transform 280ms cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform;
  margin-bottom: 3px;

  &:active {
    transform: translateY(2px) scale(0.98);
  }
`;

const HeaderStyle = styled.header`
  padding: 12px 24px;
  margin-bottom: 40px;
  box-shadow: 0 1px 4px ${COLORS.boxShadow};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  ${media(BREAKPOINTS.ml)} {
    margin-bottom: 24px;
    padding: 14px 16px;
  }

  ${media(BREAKPOINTS.xs)} {
    position: sticky;
    top: 0;
    z-index: 100;
    background-color: ${COLORS.background};
  }
`;

const HeaderTitle = styled.span`
  display: flex;
  align-items: center;
  gap: 12px;
  svg {
    width: 26px;
    height: 26px;
  }
  h3 {
    color: ${COLORS.text};
  }

  ${media(BREAKPOINTS.xs)} {
    svg {
      width: 22px;
      height: 22px;
    }
  }

  &:first-of-type {
    margin-right: auto;
  }
`;
