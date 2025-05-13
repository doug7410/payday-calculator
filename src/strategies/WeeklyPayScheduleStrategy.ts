import { PayScheduleStrategy } from './PayScheduleStrategy.ts';
import { getDaysDiff } from '../DateUtils.ts';

export class WeeklyPayScheduleStrategy implements PayScheduleStrategy {
  adjustForMinimumDays(dueDate: Date, fundDay: Date, minDays: number): Date {
    const newDueDate = new Date(dueDate);
    
    if (getDaysDiff(newDueDate, fundDay) < minDays) {
      newDueDate.setDate(newDueDate.getDate() + 7);
    }
    
    return newDueDate;
  }
}