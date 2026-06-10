import { useEffect, useState } from 'react';
import TopicTree from '../components/curriculum-tree';
import AppLayout from '../components/widgets/app/layout';
import { BREAKPOINTS } from '../assets/styles/breakpoints';
import { MobileTopicTree } from '../components/curriculum-tree-mobile';

export default function CurriculumTreeMainPage() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < BREAKPOINTS.sm);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < BREAKPOINTS.sm);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <AppLayout>
      {!isMobile && <TopicTree />}
      {isMobile && <MobileTopicTree />}
    </AppLayout>
  );
}
