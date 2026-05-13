import styled, { css } from 'styled-components';
import { panelItems } from '../assets/shared/constants/panel';
import { COLORS } from '../assets/styles/colors';
import { TextBody } from '../assets/styles/typography';
import logo from '../assets/images/logo.png';
import { useLocation } from 'react-router-dom';
import { BasicBlock } from './blocks';

export default function Panel() {
  const location = useLocation();

  return (
    <PanelStyle $gap="40px" width="15rem">
      <img src={logo} alt="logo-img" />
      <BasicBlock $gap="2px">
        {Object.entries(panelItems).map(([key, item]) => {
          const isActive = location.pathname.includes(key);
          return (
            <PanelItem $active={isActive} key={key}>
              {item.icon({
                color: isActive ? COLORS.background : COLORS.text,
              })}{' '}
              <TextBody $medium>{item.name}</TextBody>
            </PanelItem>
          );
        })}
      </BasicBlock>
    </PanelStyle>
  );
}

const PanelStyle = styled(BasicBlock)`
  align-items: start;
  height: 100vh;
  padding: 32px 12px;
  background-color: ${COLORS.background};
  box-shadow: 1px 1px 4px ${COLORS.boxShadow};
  position: relative;

  img {
    height: 32px;
    width: auto;
  }

  ${BasicBlock} {
    height: 100%;
  }
`;

const PanelItem = styled.div<{ $active?: boolean }>`
  padding: 14px 20px;
  width: 100%;
  display: flex;
  gap: 12px;
  background-color: transparent;
  align-items: center;
  border-radius: 12px;
  transition: background-color 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);

  &:last-child {
    margin-top: auto; // штовхає останній елемент вниз
  }

  ${({ $active }) =>
    $active &&
    css`
      box-shadow: 0 1px 3px 0px ${COLORS.boxShadow};
      background-color: ${COLORS.accent};
      ${TextBody} {
        color: ${COLORS.background};
      }

      &:hover {
        opacity: 0.8;
      }
    `}

  &:hover {
    box-shadow: 0 1px 3px 0px ${COLORS.boxShadow};
    background-color: ${({ $active }) => ($active ? COLORS.accent : COLORS.lighterBg)};
    cursor: pointer;
    ${TextBody} {
      color: ${({ $active }) => ($active ? COLORS.background : COLORS.text)};
    }
  }
`;
