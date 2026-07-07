import { Outlet } from 'react-router-dom';
import { detailsTabs } from '../../../../assets/shared/constants/details-course';
import { COLORS } from '../../../../assets/styles/colors';
import { CardTitle, SubTitle, TextBody } from '../../../../assets/styles/typography';
import { StyledTab, TabList } from '../../../../components/tabs-list';
import AppLayout from '../../../../components/widgets/app/layout';
import styled from 'styled-components';
import { BasicBlock } from '../../../../components/blocks';
import { BREAKPOINTS, media } from '../../../../assets/styles/breakpoints';

export default function MainDetailsCoursePage() {
  console.log(location.pathname);

  return (
    <AppLayout>
      <span className="d-flex flex-column gap-1">
        <TextBody $medium>Курс: </TextBody>
        <SubTitle>Алгоритми проєктування</SubTitle>
      </span>
      <MainTabsBody $bgColor={COLORS.lighterBg}>
        <TabList className="flex-grow-0 w-100 justify-content-between">
          {detailsTabs.map((item) => {
            // const isActive = location.pathname === `/teacher/courses/details/${item.link}`;
            return (
              <StyledTab
                to={item.link}
                key={JSON.stringify(item)}
                className={`${(isActive: boolean) => (isActive ? 'active' : '')}`}
                $color={COLORS.accent}
              >
                {({ isActive }) => (
                  <>
                    {item.icon({
                      color: isActive ? COLORS.accent : COLORS.text,
                      size: 24,
                    })}
                    <TextBody $medium>{item.title}</TextBody>
                  </>
                )}
              </StyledTab>
            );
          })}
        </TabList>

        <BasicBlock data-type="main-block">
          <Outlet />
        </BasicBlock>
      </MainTabsBody>
    </AppLayout>
  );
}

const MainTabsBody = styled(BasicBlock)`
  border-radius: 12px;

  [data-type='main-block'] {
    background-color: ${COLORS.lighterBg};
    padding: 24px;
    border-radius: 12px;
    gap: 24px;
    align-items: start;

    padding-bottom: 40px;

    ${CardTitle} {
      color: ${COLORS.text};
    }

    ${media(BREAKPOINTS.ml)} {
      padding: 18px;
      padding-bottom: 32px;
      gap: 18px;
    }

    ${media(BREAKPOINTS.sm)} {
      padding: 14px;
      padding-bottom: 24px;
      gap: 14px;
    }
  }
`;
