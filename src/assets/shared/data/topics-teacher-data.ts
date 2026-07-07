import {
  TopicDetailsStatusEnum,
  TopicMaterialEnum,
  type TopicDetailTeacher,
} from '../constants/details-course';

export const TOPIC_DETAILS_TEACHER: TopicDetailTeacher[] = [
  {
    id: '1',
    topicName: 'Введення в алгоритми проєктування',
    status: TopicDetailsStatusEnum.APPROVED,
    description:
      "Тема знайомить студентів з поняттям алгоритму, його властивостями та роллю у програмуванні. Студенти навчаться аналізувати прості задачі та записувати їх розв'язок у вигляді покрокових інструкцій.",
    learningOutcomes: [
      {
        id: 1,
        text: 'Пояснювати поняття алгоритму та його властивості',
        level: 1,
        isVerified: true,
      },
      {
        id: 2,
        text: "Аналізувати прості задачі та будувати алгоритм їх розв'язання",
        level: 1,
        isVerified: true,
      },
      { id: 3, text: 'Записувати алгоритм у вигляді псевдокоду', level: 3, isVerified: true },
      {
        id: 4,
        text: 'Розрізняти лінійні, розгалужені та циклічні алгоритми',
        level: 5,
        isVerified: true,
      },
    ],
    keyTerms: ['алгоритм', 'псевдокод', 'блок-схема', 'виконавець', 'інструкція', 'крок'],
    keyTermsVerified: true,
    materials: [
      { id: 1, fileName: 'intro-slides.pptx', verified: TopicMaterialEnum.DONE },
      { id: 2, fileName: 'lecture1.pdf', verified: TopicMaterialEnum.DONE },
    ],
    materialsNote: 'Файли завантажено успішно, дані згенеровано та підтверджено.',
  },
  {
    id: '2',
    topicName: 'Часова складність та нотація Big-O',
    status: TopicDetailsStatusEnum.APPROVED,
    description:
      'Студенти вивчають способи оцінки ефективності алгоритмів через нотацію Big-O. Тема охоплює аналіз найкращого, середнього та найгіршого випадків виконання.',
    learningOutcomes: [
      {
        id: 1,
        text: 'Пояснювати поняття часової та просторової складності',
        level: 1,
        isVerified: true,
      },
      {
        id: 2,
        text: 'Визначати складність простих алгоритмів у нотації Big-O',
        level: 1,
        isVerified: true,
      },
      {
        id: 3,
        text: 'Порівнювати алгоритми за їх асимптотичною складністю',
        level: 3,
        isVerified: true,
      },
      {
        id: 4,
        text: 'Аналізувати вкладені цикли та рекурсивні виклики',
        level: 5,
        isVerified: true,
      },
    ],
    keyTerms: [
      'Big-O',
      'складність',
      'O(n)',
      'O(log n)',
      'O(n²)',
      'асимптотика',
      'часова складність',
    ],
    keyTermsVerified: true,
    materials: [
      { id: 1, fileName: 'big-o-slides.pptx', verified: TopicMaterialEnum.DONE },
      { id: 2, fileName: 'lecture2.pdf', verified: TopicMaterialEnum.PROCESS },
    ],
    materialsNote: 'Файли завантажено успішно, дані згенеровано та підтверджено.',
  },
  {
    id: '3',
    topicName: 'Рекурсія та динамічне програмування',
    status: TopicDetailsStatusEnum.APPROVED,
    description:
      'Тема розкриває принцип рекурсії та її застосування у програмуванні. Студенти також знайомляться з технікою динамічного програмування для оптимізації рекурсивних рішень.',
    learningOutcomes: [
      { id: 1, text: 'Пояснювати принцип рекурсії та базовий випадок', level: 1, isVerified: true },
      {
        id: 2,
        text: 'Реалізовувати рекурсивні алгоритми (факторіал, числа Фібоначчі)',
        level: 1,
        isVerified: true,
      },
      { id: 3, text: 'Визначати підзадачі, що перекриваються', level: 3, isVerified: true },
      {
        id: 4,
        text: 'Застосовувати мемоізацію для оптимізації рекурсії',
        level: 5,
        isVerified: true,
      },
    ],
    keyTerms: [
      'рекурсія',
      'базовий випадок',
      'мемоізація',
      'динамічне програмування',
      'стек викликів',
      'підзадача',
    ],
    keyTermsVerified: true,
    materials: [
      { id: 1, fileName: 'recursion-slides.pptx', verified: TopicMaterialEnum.CANCEL },
      { id: 2, fileName: 'lecture3.pdf', verified: TopicMaterialEnum.DONE },
    ],
    materialsNote: 'Файли завантажено успішно, дані згенеровано та підтверджено.',
  },
  {
    id: '4',
    topicName: 'Жадібні алгоритми',
    status: TopicDetailsStatusEnum.APPROVED,
    description:
      'Студенти вивчають жадібну стратегію — підхід, при якому на кожному кроці обирається локально оптимальне рішення. Розглядаються класичні задачі: задача про розмін, покриття відрізків, алгоритм Гафмана.',
    learningOutcomes: [
      { id: 1, text: 'Пояснювати принцип жадібного вибору', level: 1, isVerified: true },
      {
        id: 2,
        text: 'Визначати задачі, де жадібний підхід дає оптимальне рішення',
        level: 3,
        isVerified: true,
      },
      {
        id: 3,
        text: 'Реалізовувати жадібні алгоритми для класичних задач',
        level: 3,
        isVerified: true,
      },
      {
        id: 4,
        text: 'Порівнювати жадібний підхід з динамічним програмуванням',
        level: 5,
        isVerified: true,
      },
    ],
    keyTerms: [
      'жадібний алгоритм',
      'локальний оптимум',
      'глобальний оптимум',
      'Гафман',
      'розмін',
      'покриття',
    ],
    keyTermsVerified: true,
    materials: [
      { id: 1, fileName: 'greedy-slides.pptx', verified: TopicMaterialEnum.DONE },
      { id: 2, fileName: 'lecture4.pdf', verified: TopicMaterialEnum.DONE },
    ],
    materialsNote: 'Файли завантажено успішно, дані згенеровано та підтверджено.',
  },
  {
    id: '5',
    topicName: 'Алгоритми сортування',
    status: TopicDetailsStatusEnum.IN_PROGRESS,
    description:
      'Тема охоплює основні алгоритми сортування: бульбашкове, вибірне, вставками, злиттям та швидке сортування. Порівнюється їх складність і практичне застосування.',
    learningOutcomes: [
      {
        id: 1,
        text: 'Пояснювати принцип роботи основних алгоритмів сортування',
        level: 1,
        isVerified: true,
      },
      {
        id: 2,
        text: 'Реалізовувати bubble sort, selection sort та insertion sort',
        level: 3,
        isVerified: true,
      },
      {
        id: 3,
        text: 'Порівнювати алгоритми сортування за складністю',
        level: 3,
        isVerified: false,
      },
      {
        id: 4,
        text: 'Вибирати оптимальний алгоритм залежно від задачі',
        level: 5,
        isVerified: false,
      },
    ],
    keyTerms: [
      'сортування',
      'bubble sort',
      'merge sort',
      'quick sort',
      'стабільність',
      'порівняння',
    ],
    keyTermsVerified: false,
    materials: [{ id: 1, fileName: 'sorting-slides.pptx', verified: TopicMaterialEnum.PROCESS }],
    materialsNote: 'Матеріали на перевірці.',
  },
  {
    id: '6',
    topicName: 'Алгоритми пошуку',
    status: TopicDetailsStatusEnum.IN_PROGRESS,
    description:
      'Студенти ознайомляться з алгоритмами лінійного та бінарного пошуку, їх умовами застосування та порівняльною ефективністю.',
    learningOutcomes: [
      {
        id: 1,
        text: 'Пояснювати різницю між лінійним та бінарним пошуком',
        level: 1,
        isVerified: false,
      },
      {
        id: 2,
        text: 'Реалізовувати бінарний пошук у відсортованому масиві',
        level: 3,
        isVerified: false,
      },
      { id: 3, text: 'Оцінювати складність алгоритмів пошуку', level: 5, isVerified: false },
    ],
    keyTerms: ['лінійний пошук', 'бінарний пошук', 'масив', 'індекс', 'відсортований'],
    keyTermsVerified: false,
    materials: [],
    materialsNote: 'Матеріали ще не завантажено.',
  },
  {
    id: '7',
    topicName: 'Графові алгоритми',
    status: TopicDetailsStatusEnum.IN_PROGRESS,
    description:
      'Тема знайомить з поняттям графу та основними алгоритмами обходу: BFS і DFS. Розглядаються задачі пошуку найкоротшого шляху (алгоритм Дейкстри).',
    learningOutcomes: [
      { id: 1, text: 'Пояснювати поняття графу, вершини та ребра', level: 1, isVerified: false },
      { id: 2, text: 'Реалізовувати BFS та DFS', level: 3, isVerified: false },
      {
        id: 3,
        text: 'Застосовувати алгоритм Дейкстри для пошуку шляху',
        level: 5,
        isVerified: false,
      },
    ],
    keyTerms: ['граф', 'вершина', 'ребро', 'BFS', 'DFS', 'Дейкстра', 'суміжність'],
    keyTermsVerified: false,
    materials: [],
    materialsNote: 'Матеріали ще не завантажено.',
  },
  {
    id: '8',
    topicName: 'Дерева та структури даних',
    status: TopicDetailsStatusEnum.IN_PROGRESS,
    description:
      'Студенти вивчають деревоподібні структури даних: бінарні дерева, дерева пошуку (BST), купи. Розглядаються операції вставки, видалення та пошуку.',
    learningOutcomes: [
      { id: 1, text: 'Пояснювати структуру бінарного дерева', level: 1, isVerified: false },
      { id: 2, text: 'Реалізовувати основні операції з BST', level: 3, isVerified: false },
      { id: 3, text: 'Порівнювати дерева пошуку та купи', level: 5, isVerified: false },
    ],
    keyTerms: ['дерево', 'BST', 'купа', 'вузол', 'корінь', 'листок', 'обхід'],
    keyTermsVerified: false,
    materials: [],
    materialsNote: 'Матеріали ще не завантажено.',
  },
  {
    id: '9',
    topicName: 'Хеш-таблиці та хешування',
    status: TopicDetailsStatusEnum.IN_PROGRESS,
    description:
      "Тема охоплює принципи хешування, побудову хеш-таблиць та розв'язання колізій. Студенти навчаться оцінювати ефективність хеш-функцій.",
    learningOutcomes: [
      { id: 1, text: 'Пояснювати принцип роботи хеш-таблиці', level: 1, isVerified: false },
      { id: 2, text: "Описувати методи розв'язання колізій", level: 3, isVerified: false },
      { id: 3, text: 'Оцінювати складність операцій у хеш-таблиці', level: 5, isVerified: false },
    ],
    keyTerms: [
      'хешування',
      'хеш-таблиця',
      'колізія',
      'ланцюжок',
      'відкрита адресація',
      'хеш-функція',
    ],
    keyTermsVerified: false,
    materials: [],
    materialsNote: 'Матеріали ще не завантажено.',
  },
  {
    id: '10',
    topicName: 'Алгоритми на рядках',
    status: TopicDetailsStatusEnum.DONE,
    description:
      'Студенти вивчають алгоритми пошуку підрядка, порівняння рядків та регулярні вирази. Розглядається алгоритм KMP та алгоритм Рабіна-Карпа.',
    learningOutcomes: [
      { id: 1, text: 'Реалізовувати наївний пошук підрядка', level: 1, isVerified: false },
      { id: 2, text: 'Пояснювати принцип роботи алгоритму KMP', level: 3, isVerified: false },
      { id: 3, text: 'Порівнювати алгоритми пошуку за складністю', level: 5, isVerified: false },
    ],
    keyTerms: ['рядок', 'підрядок', 'KMP', 'Рабін-Карп', 'префікс-функція', 'регулярний вираз'],
    keyTermsVerified: false,
    materials: [],
    materialsNote: 'Матеріали ще не завантажено.',
  },
  {
    id: '11',
    topicName: 'Паралельні алгоритми',
    status: TopicDetailsStatusEnum.DONE,
    description:
      'Тема знайомить з основами паралельних обчислень, моделями паралелізму та алгоритмами, що можуть виконуватись одночасно на кількох процесорах.',
    learningOutcomes: [
      {
        id: 1,
        text: 'Пояснювати відмінність між послідовним і паралельним виконанням',
        level: 1,
        isVerified: false,
      },
      { id: 2, text: 'Описувати моделі паралельних обчислень (PRAM)', level: 3, isVerified: false },
      { id: 3, text: 'Визначати задачі, придатні для паралелізації', level: 5, isVerified: false },
    ],
    keyTerms: ['паралелізм', 'потік', 'процесор', 'PRAM', 'синхронізація', 'гонка даних'],
    keyTermsVerified: false,
    materials: [],
    materialsNote: 'Матеріали ще не завантажено.',
  },
  {
    id: '12',
    topicName: 'Апроксимаційні алгоритми',
    status: TopicDetailsStatusEnum.NO_MATERIALS,
    description:
      "Студенти вивчають підходи до розв'язання NP-складних задач через апроксимацію. Розглядаються гарантії якості апроксимації та практичні приклади.",
    learningOutcomes: [
      {
        id: 1,
        text: 'Пояснювати поняття NP-складності та апроксимації',
        level: 1,
        isVerified: false,
      },
      {
        id: 2,
        text: 'Описувати апроксимаційні алгоритми для задачі покриття',
        level: 3,
        isVerified: false,
      },
      { id: 3, text: 'Оцінювати коефіцієнт апроксимації алгоритму', level: 5, isVerified: false },
    ],
    keyTerms: ['апроксимація', 'NP-складність', 'покриття множини', 'коефіцієнт', 'евристика'],
    keyTermsVerified: false,
    materials: [],
    materialsNote: 'Матеріали ще не завантажено.',
  },
];
