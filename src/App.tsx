import { Navigate, Route, Routes } from 'react-router-dom';
import SignInPage from './pages/auth/sign-in';
import SignUpPage from './pages/auth/sign-up';
import ForgotPasswordPage from './pages/auth/forgot-password';
import DashboardStudentPage from './pages/student/dashboard';
import DashboardPageTeacher from './pages/teacher/dashboard';
import StudyPlanMainPage from './pages/student/study-plan';
import StudySessionMainPage from './pages/student/study-session';
import TopicsDetailsStudentPage from './pages/student/topics/details';
import MaterialDetailsTopicPage from './pages/student/topics/material';
import StudyingStep from './pages/student/start-studying/steps';
import NotFound from './pages/not-found';
import StudyingResult from './pages/student/start-studying/result';
import CurriculumTreeMainPage from './pages/student/curriculum-tree-main';
import FaqStudentPage from './pages/student/faq';
import SettingsPage from './pages/settings';
import NotificationPage from './pages/notification';
import MainCoursesPageTeacher from './pages/teacher/courses/main';
import MainDetailsCoursePage from './pages/teacher/courses/details/main';
import OverviewDetailsCourseTab from './pages/teacher/courses/details/overview';
import TopicsDetailsCourseTab from './pages/teacher/courses/details/topic/main';
import TopicDetailsMainPageCourseTab from './pages/teacher/courses/details/topic/details';
import TopicUpdateMainPageCourseTab from './pages/teacher/courses/details/topic/update';
import LearningOutcomesDetailsCourseTab from './pages/teacher/courses/details/learning-outcomes';
import StudentsMainCourseTab from './pages/teacher/courses/details/students/main';
import AnalyticsDetailsCourseTab from './pages/teacher/courses/details/analytics';
import MainStudentsPage from './pages/teacher/student/main';
import DetailsStudentsPage from './pages/teacher/student/details';
import StudentsDetailsCourseTab from './pages/teacher/courses/details/students/details';
import FaqTeacherPage from './pages/teacher/faq';
import CourseCreateLayout from './pages/teacher/courses/create/layout';
import BasicInfoStep from './pages/teacher/courses/create/steps/basic-info';
import TopicsStep from './pages/teacher/courses/create/steps/topics';
import StudentsStep from './pages/teacher/courses/create/steps/students';
import ReviewStep from './pages/teacher/courses/create/steps/review';
import PublicRoute from './components/widgets/routes/public';
import ProtectedRoute from './components/widgets/routes/protected';

function App() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Route>
      <Route path="forgot-password" element={<ForgotPasswordPage />} />
      <Route path="student" element={<ProtectedRoute />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<DashboardStudentPage />} />
        <Route path="study-plan" element={<StudyPlanMainPage />} />
        <Route path="knowledge-tree" element={<CurriculumTreeMainPage />} />
        <Route path="study-session">
          <Route index element={<Navigate to="main" replace />} />
          <Route path="main" element={<StudySessionMainPage />} />
          <Route path="start" element={<StudySessionMainPage />} />

          <Route path="topics">
            <Route index element={<Navigate to="details" replace />} />
            <Route path="details" element={<TopicsDetailsStudentPage />} />
            <Route path="materials" element={<MaterialDetailsTopicPage />} />
          </Route>
          <Route path="studying" element={<StudyingStep />} />
          <Route path="results" element={<StudyingResult />} />
        </Route>
        <Route path={'faq'} element={<FaqStudentPage />} />
        <Route path={'settings'} element={<SettingsPage />} />
        <Route path={'notifications'} element={<NotificationPage />} />
      </Route>

      <Route path="teacher" element={<ProtectedRoute />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPageTeacher />} />
        <Route path="courses">
          <Route index element={<Navigate to="main" replace />} />
          <Route path="main" element={<MainCoursesPageTeacher />} />
          <Route path="details" element={<MainDetailsCoursePage />}>
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<OverviewDetailsCourseTab />} />
            <Route path="learning-outcomes" element={<LearningOutcomesDetailsCourseTab />} />
            <Route path="students" element={<StudentsMainCourseTab />} />
            <Route path="students/details" element={<StudentsDetailsCourseTab />} />
            <Route path="analytics" element={<AnalyticsDetailsCourseTab />} />

            <Route path="topics" element={<TopicsDetailsCourseTab />} />
            <Route path="topics/details" element={<TopicDetailsMainPageCourseTab />} />
            <Route path="topics/update" element={<TopicUpdateMainPageCourseTab />} />
          </Route>
          <Route path="/teacher/courses/create" element={<CourseCreateLayout />}>
            <Route index element={<Navigate to="basic-info" replace />} />
            <Route path="basic-info" element={<BasicInfoStep />} />
            <Route path="topics" element={<TopicsStep />} />
            <Route path="students" element={<StudentsStep />} />
            <Route path="review" element={<ReviewStep />} />
          </Route>
        </Route>
        <Route path="students">
          <Route index element={<Navigate to="main" replace />} />
          <Route path="main" element={<MainStudentsPage />} />
          <Route path="details" element={<DetailsStudentsPage />} />
        </Route>
        <Route path={'faq'} element={<FaqTeacherPage />} />
        <Route path={'settings'} element={<SettingsPage />} />
      </Route>

      <Route path="" element={<Navigate to="/sign-in" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
