import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { PanelItemEnum, panelItems } from '../../../assets/shared/constants/panel';
import { CardTitle } from '../../../assets/styles/typography';
import { COLORS } from '../../../assets/styles/colors';

export default function Header() {
  const location = useLocation();
  const currentPathItem = location.pathname.split('/').at(-1);
  const active = panelItems[currentPathItem as PanelItemEnum];
  return (
    <HeaderStyle>
      <HeaderTitle>
        {active.icon({ color: COLORS.text })}
        <CardTitle>{active.name}</CardTitle>
      </HeaderTitle>
    </HeaderStyle>
  );
}

const HeaderStyle = styled.header`
  padding: 20px 24px;
  margin-bottom: 40px;
  box-shadow: 0 1px 4px ${COLORS.boxShadow};
  width: 100%;
`;

const HeaderTitle = styled.span`
  display: flex;
  align-items: center;
  gap: 16px;
  svg {
    width: 26px;
    height: 26px;
  }
  h3 {
    color: ${COLORS.text};
  }
`;
