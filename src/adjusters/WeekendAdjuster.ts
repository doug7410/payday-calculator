import { BaseAdjuster } from './BaseAdjuster.ts';
import { DayOfWeek } from '../types/DayOfWeek.ts';
import { isOnDayOfWeek, dateListIncludes } from '../DateUtils.ts';

export class WeekendAdjuster extends BaseAdjuster {
  protected doAdjust(date: Date, holidays: Date[]): Date {
    const adjustedDate = new Date(date);
    
    if (isOnDayOfWeek(DayOfWeek.SATURDAY, adjustedDate)) {
      // Check if the following Monday is a holiday
      const mondayDate = new Date(adjustedDate);
      mondayDate.setDate(mondayDate.getDate() + 2); // Move to Monday
      
      if (dateListIncludes(holidays, mondayDate)) {
        // If Monday is a holiday, move back to Friday
        adjustedDate.setDate(adjustedDate.getDate() - 1);
      } else {
        // Otherwise move to Monday
        adjustedDate.setDate(adjustedDate.getDate() + 2);
      }
    } else if (isOnDayOfWeek(DayOfWeek.SUNDAY, adjustedDate)) {
      // Check if the following Monday is a holiday
      const mondayDate = new Date(adjustedDate);
      mondayDate.setDate(mondayDate.getDate() + 1); // Move to Monday
      
      if (dateListIncludes(holidays, mondayDate)) {
        // If Monday is a holiday, move back to Friday
        adjustedDate.setDate(adjustedDate.getDate() - 2);
      } else {
        // Otherwise move to Monday
        adjustedDate.setDate(adjustedDate.getDate() + 1);
      }
    }
    
    return adjustedDate;
  }
}