import { Navigate, Outlet, useParams } from 'react-router-dom';
import { detailsTabs } from '../../../../assets/shared/constants/details-course';
import { COLORS } from '../../../../assets/styles/colors';
import { CardTitle, SubTitle, TextBody } from '../../../../assets/styles/typography';
import { StyledTab, TabList } from '../../../../components/tabs-list';
import AppLayout from '../../../../components/widgets/app/layout';
import styled from 'styled-components';
import { BasicBlock } from '../../../../components/blocks';
import { BREAKPOINTS, media } from '../../../../assets/styles/breakpoints';
import { useCourseDetailsTeacher } from '../../../../assets/shared/hooks/useCourseDetailsStudent';
import { useTeacherCoursesWithStats } from '../../../../assets/shared/hooks/useTeacherCoursesWithStats';

export default function MainDetailsCoursePage() {
  const { courseId } = useParams<{ courseId: string }>();
  const id = Number(courseId);

  const { course, isLoading } = useCourseDetailsTeacher(id);
  const { courses, isLoading: coursesLoading } = useTeacherCoursesWithStats();

  const details = courses.find((x) => x.id === id);

  if (!courseId) return <Navigate to="/teacher/courses/main" replace />;

  console.log(course);
  console.log(courses);
  console.log(details);
  console.log(courseId);

  if (!course || !details) {
    return (
      <AppLayout>
        <TextBody>Курс не знайдено</TextBody>
      </AppLayout>
    );
  }

  return (
    <AppLayout loadingState={isLoading || coursesLoading}>
      <span className="d-flex flex-column gap-1">
        <TextBody $medium>Курс: </TextBody>
        <SubTitle>{details.title}</SubTitle>
      </span>
      <MainTabsBody $bgColor={COLORS.lighterBg}>
        <TabList className="flex-grow-0 w-100 justify-content-between">
          {detailsTabs.map((item) => (
            <StyledTab to={item.link} key={item.link} $color={COLORS.accent}>
              {({ isActive }) => (
                <>
                  {item.icon({ color: isActive ? COLORS.accent : COLORS.text, size: 24 })}
                  <TextBody $medium>{item.title}</TextBody>
                </>
              )}
            </StyledTab>
          ))}
        </TabList>

        <BasicBlock data-type="main-block">
          <Outlet context={id} />
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
