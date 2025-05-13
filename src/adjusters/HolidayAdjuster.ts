import { BaseAdjuster } from './BaseAdjuster.ts';
import { dateListIncludes } from '../DateUtils.ts';
import { DayOfWeek } from '../types/DayOfWeek.ts';
import { isOnDayOfWeek } from '../DateUtils.ts';

export class HolidayAdjuster extends BaseAdjuster {

  protected doAdjust(date: Date, holidays: Date[]): Date {
    const adjustedDate = new Date(date);
    
    // If the date is not a holiday, no adjustment needed
    if (!dateListIncludes(holidays, adjustedDate)) {
      return adjustedDate;
    }
    
    // Move date back one day
    adjustedDate.setDate(adjustedDate.getDate() - 1);
    
    // Check if the new date is a weekend
    if (isOnDayOfWeek(DayOfWeek.SUNDAY, adjustedDate)) {
      adjustedDate.setDate(adjustedDate.getDate() - 2); // Move back to Friday
    } else if (isOnDayOfWeek(DayOfWeek.SATURDAY, adjustedDate)) {
      adjustedDate.setDate(adjustedDate.getDate() - 1); // Move back to Friday
    }

    return this.doAdjust(adjustedDate, holidays);
  }
}