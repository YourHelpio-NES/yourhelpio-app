import styled from 'styled-components';
import logo from '../../assets/images/logo.png';

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
  }
`;
