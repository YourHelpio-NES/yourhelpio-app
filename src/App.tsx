import { Navigate, Route, Routes } from 'react-router-dom';
import SignInPage from './pages/auth/sign-in';
import SignUpPage from './pages/auth/sign-up';
import ForgotPasswordPage from './pages/auth/forgot-password';
import DashboardPage from './pages/student/dashboard';
import StudyPlanMainPage from './pages/student/study-plan';

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
      </Route>

      <Route path="" element={<Navigate to="/sign-in" />} />
    </Routes>
  );
}

export default App;
