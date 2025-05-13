import { DateAdjuster } from './DateAdjuster.ts';

export abstract class BaseAdjuster implements DateAdjuster {
  protected nextAdjuster: DateAdjuster | null = null;
  
  setNext(next: DateAdjuster): DateAdjuster {
    this.nextAdjuster = next;
    return next;
  }
  
  adjust(date: Date, holidays: Date[]): Date {
    const adjustedDate = this.doAdjust(date, holidays);

    if (this.nextAdjuster) {
      return this.nextAdjuster.adjust(adjustedDate, holidays);
    }

    return adjustedDate;
  }

  protected abstract doAdjust(date: Date, holidays: Date[]): Date;
}