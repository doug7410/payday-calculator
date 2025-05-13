import { PayScheduleStrategy } from './PayScheduleStrategy.ts';
import { getDaysDiff } from '../DateUtils.ts';

export class MonthlyPayScheduleStrategy implements PayScheduleStrategy {
  adjustForMinimumDays(dueDate: Date, fundDay: Date, minDays: number): Date {
    const newDueDate = new Date(dueDate);
    
    if (getDaysDiff(newDueDate, fundDay) < minDays) {
      newDueDate.setMonth(newDueDate.getMonth() + 1);
    }
    
    return newDueDate;
  }
}