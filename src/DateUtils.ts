import { DayOfWeek } from './types/DayOfWeek.ts';

const isOnDayOfWeek = (name: DayOfWeek, date: Date): boolean => {
  if (name === DayOfWeek.SATURDAY) {
    return date.getDay() === 6;
  }

  if (name === DayOfWeek.SUNDAY) {
    return date.getDay() === 0;
  }

  return false;
};

const dateListIncludes = (holidays: Date[], date: Date): boolean => {
  return holidays.map(holiday => holiday.getTime()).includes(date.getTime());
};


const getDaysDiff = (date1: Date, date2: Date): number => {
  return Math.floor(
    (date1.getTime() - date2.getTime()) / (1000 * 60 * 60 * 24),
  );
};

export { isOnDayOfWeek, dateListIncludes, getDaysDiff };