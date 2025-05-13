import { DateAdjuster } from './DateAdjuster.ts';
import { HolidayAdjuster } from './HolidayAdjuster.ts';
import { WeekendAdjuster } from './WeekendAdjuster.ts';

/**
 * Factory to set up adjusters chain
 */
export class DateAdjusterChain {
  static createChain(): DateAdjuster {
    const holidayAdjuster = new HolidayAdjuster();
    const weekendAdjuster = new WeekendAdjuster();

    // create and return the chain
    holidayAdjuster.setNext(weekendAdjuster);
    
    return holidayAdjuster;
  }

  static adjustDate(date: Date, holidays: Date[]): Date {
    const chain = this.createChain();
    return chain.adjust(date, holidays);
  }
}