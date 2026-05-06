import styled from 'styled-components';
import Header from './header';
import { COLORS } from '../../assets/styles/colors';

export interface LayoutProps {
  className?: string;
  blockType?: string;
}

const MainLayout: React.FC<React.PropsWithChildren<LayoutProps>> = ({ className, children }) => {
  return (
    <>
      <Wrapper className={`d-flex flex-column align-items-center ${className}`}>
        <Header />
        {children}
        {/* <Footer /> */}
      </Wrapper>
    </>
  );
};

export default MainLayout;

const Wrapper = styled.div`
  background-color: ${COLORS.background};
  width: 100%;
  min-height: 100vh;
  padding-bottom: 60px;

  &::selection {
    color: ${COLORS.background};
    background: ${COLORS.accent};
  }
`;
