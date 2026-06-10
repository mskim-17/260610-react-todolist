export const toDateString = (date: Date) => {
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(date).replace(/\. /g, '-').replace('.', '');
}

const getShiftedDate = (date: Date, dayShift: number) => {
  const shiftedDate = new Date(date);
  shiftedDate.setDate(date.getDate() + dayShift);
  return shiftedDate;
}

export const getTodayDateString = () => toDateString(new Date());
export const getShiftedDateString = (dateStr: string, dayShift: number) => toDateString(getShiftedDate(new Date(dateStr), dayShift));