import { BasePayScheduleStrategy } from './BasePayScheduleStrategy.ts';

export class BiWeeklyPayScheduleStrategy extends BasePayScheduleStrategy {

  protected advanceToNextPaymentPeriod(date: Date): Date {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 14);
    return newDate;
  }
}