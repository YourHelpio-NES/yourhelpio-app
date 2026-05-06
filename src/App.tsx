import { Navigate, Route, Routes } from 'react-router-dom';
import SignInPage from './pages/auth/sign-in';
import SignUpPage from './pages/auth/sign-up';

function App() {
  return (
    <Routes>
      <Route path="sign-in" element={<SignInPage />} />
      <Route path="sign-up" element={<SignUpPage />} />
      <Route path="" element={<Navigate to="/sign-in" />} />
    </Routes>
  );
}

export default App;
