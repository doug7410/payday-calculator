import { BasePayScheduleStrategy } from './BasePayScheduleStrategy.ts';

export class WeeklyPayScheduleStrategy extends BasePayScheduleStrategy {

  protected advanceToNextPaymentPeriod(date: Date): Date {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 7);
    return newDate;
  }
}