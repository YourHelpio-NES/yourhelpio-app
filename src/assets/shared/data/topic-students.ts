import type { TopicProblemTeacherRow } from '../constants/details-course';
import type { StudentTopic, StudentStatus } from '../constants/student';

export const STUDENT_STATUS_LABEL: Record<StudentStatus, string> = {
  in_progress: 'В процесі',
  not_started: 'Не розпочато',
  not_assigned: 'Не приєднано',
  completed: 'Завершено',
};

export const MOCK_STUDENTS: StudentTopic[] = [
  {
    id: 1,
    fullName: 'Іван Михайлович Петренко',
    email: 'ivan.petrenko@rcit.ukr.education',
    group: 'ІПЗ-21',
    progress: 75,
    status: 'in_progress',
  },
  {
    id: 2,
    fullName: 'Марія Дмитрівна Іваненко',
    email: 'mariia.ivanenko@rcit.ukr.education',
    group: 'ІПЗ-21',
    progress: 40,
    status: 'in_progress',
  },
  {
    id: 3,
    fullName: 'Олег Володимирович Коваль',
    email: 'oleh.koval@rcit.ukr.education',
    group: 'ІПЗ-21',
    progress: 10,
    status: 'not_started',
  },
  {
    id: 4,
    fullName: 'Максим Ігорович Дубчак',
    email: 'maksym.dubchak@rcit.ukr.education',
    group: 'ІПЗ-21',
    progress: null,
    status: 'not_assigned',
  },
  {
    id: 5,
    fullName: 'Олена Владиславівна Вітренко',
    email: 'olena.vitrenko@rcit.ukr.education',
    group: 'КН-21',
    progress: 100,
    status: 'completed',
  },
];

export const topicProblemMockData: TopicProblemTeacherRow[] = [
  {
    id: 1,
    topicName: 'Основи програмування',
    group: 'ІПЗ-21',
    level: 20,
  },
  {
    id: 2,
    topicName: 'Змінні',
    group: 'КН-21',
    level: 22,
  },
  {
    id: 3,
    topicName: 'Типи даних',
    group: 'ІПЗ-21',
    level: 35,
  },
];
