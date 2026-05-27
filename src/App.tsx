import { Navigate, Route, Routes } from 'react-router-dom';
import SignInPage from './pages/auth/sign-in';
import SignUpPage from './pages/auth/sign-up';
import ForgotPasswordPage from './pages/auth/forgot-password';
import DashboardPage from './pages/student/dashboard';
import StudyPlanMainPage from './pages/student/study-plan';
import StudySessionMainPage from './pages/student/study-session';
import TopicsDetailsStudentPage from './pages/student/topics/details';
import MaterialDetailsTopicPage from './pages/student/topics/material';
import StudyingStep from './pages/student/start-studying/steps';

function App() {
  return (
    <Routes>
      <Route path="sign-in" element={<SignInPage />} />
      <Route path="sign-up" element={<SignUpPage />} />
      <Route path="forgot-password" element={<ForgotPasswordPage />} />
      <Route path="student">
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="study-plan" element={<StudyPlanMainPage />} />
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
        </Route>
      </Route>

      <Route path="" element={<Navigate to="/sign-in" />} />
    </Routes>
  );
}

export default App;
