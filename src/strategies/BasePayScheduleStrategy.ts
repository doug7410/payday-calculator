import { PayScheduleStrategy } from './PayScheduleStrategy.ts';
import { getDaysDiff } from '../DateUtils.ts';

export abstract class BasePayScheduleStrategy implements PayScheduleStrategy {

  adjustForMinimumDays(dueDate: Date, fundDay: Date, minDays: number): Date {
    const newDueDate = new Date(dueDate);
    const daysSinceFundDay = getDaysDiff(newDueDate, fundDay);
    
    if (daysSinceFundDay < minDays) {
      return this.advanceToNextPaymentPeriod(newDueDate);
    }
    
    return newDueDate;
  }


  protected abstract advanceToNextPaymentPeriod(date: Date): Date;
}