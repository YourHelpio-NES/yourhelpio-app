import type { QuizSessionData } from '../constants/session';

// 2. Об'єкт із даними з зображення
export const testQuizSession: QuizSessionData = {
  sessionStatus: 'Сесію завершено!',
  results: {
    stage: {
      title: 'День 1',
      type: 'Швидка перевірка – Короткий контроль',
    },
    scorePercentage: 60, // 60% правильних відповідей
    correctAnswers: 3,
    totalQuestions: 5, // 3 / 5
    errorsCount: 1,
    skippedCount: 1,
  },
  nextStage: {
    title: 'День 2',
    module: 'Доробка прогалин',
    type: 'Виправлення',
    schedule: 'Завтра',
  },
  errors: [
    {
      questionId: 1,
      questionText: 'Що таке змінна?',
      statusText: 'неправильна відповідь',
      explanation: {
        questionId: 1,
        questionText: 'Що таке змінна?',
        body: "Змінна — це іменована комірка пам'яті, яка зберігає значення і може змінюватися під час виконання програми. Наприклад, змінна може спочатку містити одне значення, а потім — інше.",
      },
    },
    {
      questionId: 4,
      questionText:
        'Що відбудеться, якщо спробувати присвоїти текстове значення змінній числового типу?',
      statusText: 'неправильна відповідь',
      explanation: {
        questionId: 4,
        questionText:
          'Що відбудеться, якщо спробувати присвоїти текстове значення змінній числового типу?',
        body: 'У мовах із суворою (статичною) типізацією (наприклад, TypeScript, Java, C#, C++): Програма видасть помилку компіляції (на етапі написання коду або збирання), і код просто не запуститься. Мова захищає від таких дій.',
      },
      // Пояснення для цього питання на скриншоті згорнуте/відсутнє
    },
  ],
};
