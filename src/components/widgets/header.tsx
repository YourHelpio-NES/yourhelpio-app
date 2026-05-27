import styled from 'styled-components';
import logo from '../../assets/images/logo.png';
import { BREAKPOINTS, media } from '../../assets/styles/breakpoints';

export default function Header() {
  return (
    <HeaderStyle>
      <img src={logo} alt="logo-app" />
    </HeaderStyle>
  );
}

const HeaderStyle = styled.header`
  padding: 32px 60px;
  width: 100%;
  img {
    height: 38px;

    transition: height 0.25s cubic-bezier(0.075, 0.82, 0.165, 1);
  }

  ${media(BREAKPOINTS.ml)} {
    padding: 24px 40px;
    padding-top: 40px;
  }

  ${media(BREAKPOINTS.sm)} {
    padding: 16px 24px;
    padding-top: 24px;
    img {
      height: 28px;
    }
  }
`;
