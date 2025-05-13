import { BasePayScheduleStrategy } from './BasePayScheduleStrategy.ts';

export class MonthlyPayScheduleStrategy extends BasePayScheduleStrategy {

  protected advanceToNextPaymentPeriod(date: Date): Date {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + 1);
    return newDate;
  }
}