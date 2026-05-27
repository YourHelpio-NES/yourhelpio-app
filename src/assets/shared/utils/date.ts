export const formatDate = (date: Date): string =>
  date.toLocaleDateString('uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

export const getToday = () => new Date();
export const getTomorrow = () => {
  const today = getToday();
  today.setDate(today.getDate() + 1);
  return today;
};
