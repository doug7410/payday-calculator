import { PaySpan } from '../types/PaySpan.ts';
import { PayScheduleStrategy } from './PayScheduleStrategy.ts';
import { WeeklyPayScheduleStrategy } from './WeeklyPayScheduleStrategy.ts';
import { BiWeeklyPayScheduleStrategy } from './BiWeeklyPayScheduleStrategy.ts';
import { MonthlyPayScheduleStrategy } from './MonthlyPayScheduleStrategy.ts';

export class PayScheduleStrategyFactory {
  static createStrategy(paySpan: PaySpan): PayScheduleStrategy {
    switch (paySpan) {
      case PaySpan.WEEKLY:
        return new WeeklyPayScheduleStrategy();
      case PaySpan.BI_WEEKLY:
        return new BiWeeklyPayScheduleStrategy();
      case PaySpan.MONTHLY:
        return new MonthlyPayScheduleStrategy();
      default:
        throw new Error(`Unsupported pay span: ${paySpan}`);
    }
  }
}