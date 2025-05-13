const isOnDayOfWeek = (name: 'saturday' | 'sunday', date: Date): boolean => {
  if (name === 'saturday') {
    return date.getDay() === 6;
  }

  if (name === 'sunday') {
    return date.getDay() === 0;
  }

  return false;
};

const dateListIncludes = (holidays: Date[], date: Date): boolean => {
  return holidays.map(holiday => holiday.getTime()).includes(date.getTime());
};

export { isOnDayOfWeek, dateListIncludes };
