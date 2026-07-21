import Header from './header';
import ScrollToTop from './scroll-top';
import { Toaster } from 'react-hot-toast';
import { Wrapper } from '../blocks';

export interface LayoutProps {
  className?: string;
  loadingState?: boolean;
}

const MainLayout: React.FC<React.PropsWithChildren<LayoutProps>> = ({ className, children }) => {
  return (
    <>
      <ScrollToTop />
      <Wrapper className={`d-flex flex-column align-items-center ${className}`}>
        <Header />
        {children}
      </Wrapper>

      <Toaster
        position="top-right"
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

export default MainLayout;
