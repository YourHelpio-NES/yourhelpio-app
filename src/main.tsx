import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { CourseCreateProvider } from './assets/shared/hooks/useCourseCreate.tsx';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(
    <StrictMode>
      <CourseCreateProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CourseCreateProvider>
    </StrictMode>
  );
}
