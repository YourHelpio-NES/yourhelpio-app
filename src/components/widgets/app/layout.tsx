import { Toaster } from 'react-hot-toast';
import type { LayoutProps } from '../layout';
import ScrollToTop from '../scroll-top';
import Panel from '../../panel';
import styled from 'styled-components';
import { COLORS } from '../../../assets/styles/colors';
import Header from './header';
import { BREAKPOINTS, media } from '../../../assets/styles/breakpoints';
import { useEffect, useState } from 'react';

const AppLayout: React.FC<React.PropsWithChildren<LayoutProps>> = ({ className, children }) => {
  const [isCollapsed, setIsCollapsed] = useState(
    () => localStorage.getItem('collapsed-panel') === 'true'
  );
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= BREAKPOINTS.xs);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      setIsMobile(width <= BREAKPOINTS.xs);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <ScrollToTop />
      <PageLayout className={`d-flex ${className}`}>
        <Panel isMobile={isMobile} isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        <MainContent>
          <Header setIsCollapsed={setIsCollapsed} isBurger={isMobile} />
          <ContentBody>{children}</ContentBody>
        </MainContent>
      </PageLayout>

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

const ContentBody = styled.div`
  padding: 0 24px;
  padding-bottom: 40px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 16px;
  min-width: 0;

  ${media(BREAKPOINTS.md)} {
    padding: 0 16px;
    padding-bottom: 24px;
  }
`;

const MainContent = styled.div`
  flex-grow: 1;
  min-width: 0;
`;

const PageLayout = styled.div`
  background-color: ${COLORS.background};
  width: 100%;
  min-height: 100vh;
  min-width: 0;

  &::selection {
    color: ${COLORS.background};
    background: ${COLORS.accent};
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background-color: ${COLORS.background};
    border: 1px solid ${COLORS.boxShadow};
    border-radius: 100px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${COLORS.boxShadow};
    border: 1px solid ${COLORS.secondary};
    border-radius: 100px;
  }
`;
