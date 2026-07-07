import BasicInfoStep from '../../../pages/teacher/courses/create/steps/basic-info';
import ReviewStep from '../../../pages/teacher/courses/create/steps/review';
import StudentsStep from '../../../pages/teacher/courses/create/steps/students';
import TopicsStep from '../../../pages/teacher/courses/create/steps/topics';
import { StepStatusEnum, type StepCreating } from './type';

export const STEP_CREATE_COURSE_ROUTES = [
  { path: 'basic-info', component: <BasicInfoStep /> },
  { path: 'topics', component: <TopicsStep /> },
  { path: 'students', component: <StudentsStep /> },
  { path: 'review', component: <ReviewStep /> },
];

export const STEPS_CREATE_COURSE: StepCreating[] = [
  {
    name: 'Крок 01',
    description: 'Базова інформація про курс',
    title: 'Основна інформація',
    subTitle: 'Додайте базову інформацію про курс',
    status: StepStatusEnum.ACTIVE,
    path: 'basic-info',
  },
  {
    name: 'Крок 02',
    description: 'Теми, які входитимуть до курсу',
    title: 'Теми курсу',
    subTitle: 'Додайте теми, які входитимуть до курсу',
    status: StepStatusEnum.PENDING,
    path: 'topics',
  },
  {
    name: 'Крок 03',
    description: 'Додайте студентів для навчання ',
    title: 'Студенти',
    subTitle: 'Додайте студентів (групи) для навчання ',
    status: StepStatusEnum.PENDING,
    path: 'students',
  },
  {
    name: 'Крок 04',
    description: 'Перевірте курс перед створенням',
    title: 'Перевірка',
    subTitle: 'Перевірте курс перед створенням',
    status: StepStatusEnum.PENDING,
    path: 'review',
  },
];
