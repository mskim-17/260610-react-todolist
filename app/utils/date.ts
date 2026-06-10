export const getTodayStr = () => {
  return getDateStr(new Date());
}

export const getDateStr = (date: Date) => {
    return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(date).replace(/\. /g, '-').replace('.', '');
}

export const getYesterday = (date: Date) => {
  return new Date(date.setDate(date.getDate() - 1));
}

export const getTomorrow = (date: Date) => {
  return new Date(date.setDate(date.getDate() + 1));
}