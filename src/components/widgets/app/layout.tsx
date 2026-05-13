import { Toaster } from 'react-hot-toast';
import type { LayoutProps } from '../layout';
import ScrollToTop from '../scroll-top';
import Panel from '../../panel';
import styled from 'styled-components';
import { COLORS } from '../../../assets/styles/colors';
import Header from './header';

const AppLayout: React.FC<React.PropsWithChildren<LayoutProps>> = ({ className, children }) => {
  return (
    <>
      <ScrollToTop />
      <Wrapper className={`d-flex ${className}`}>
        <Panel />
        <BodyBlock>
          <Header />
          {children}
        </BodyBlock>
      </Wrapper>

      <Toaster
        toastOptions={{
          style: {
            padding: 0,
            margin: 0,
            backgroundColor: 'transparent',
            boxShadow: 'none',
            maxWidth: 'none',
            width: '100%',
          },
        }}
      />
    </>
  );
};

export default AppLayout;

const BodyBlock = styled.div`
  flex-grow: 1;
`;

const Wrapper = styled.div`
  background-color: ${COLORS.background};
  width: 100%;
  min-height: 100vh;

  &::selection {
    color: ${COLORS.background};
    background: ${COLORS.accent};
  }
`;
