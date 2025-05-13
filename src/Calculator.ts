import { dateListIncludes, isOnDayOfWeek } from './DateUtils.ts';
import { PayScheduleStrategyFactory } from './strategies/PayScheduleStrategyFactory.ts';
import { PaySpan } from './types/PaySpan.ts';
import { DayOfWeek } from './types/DayOfWeek.ts';

/**
 * This method determines the first available due date following the funding of a loan.
 * The paydate will be at least 10 days in the future from the fundDay. The
 * due date will fall on a day that is a pay date based on their pay date model
 * specified by 'paySpan' unless the date must be adjusted forward to miss a
 * weekend or backward to miss a holiday
 *
 *
 * @param fundDay: Date - The day the loan was funded.
 * @param holidays: Date[] - An array of dates containing holidays
 *
 * (One these values: weekly, bi-weekly, monthly)
 * @param paySpan: - A string representing the frequency at which the customer is paid.
 * @param payDay: payDay - A date containing one of the customers paydays
 * @param hasDirectDeposit: boolean - A boolean determining whether or not the customer
 * receives their paycheck via direct deposit.
 */
class PayDateCalculator {
  private readonly MIN_DAYS_AFTER_FUNDING = 10;

  public calculateDueDate(
    fundDay: Date,
    holidays: Date[],
    paySpan: PaySpan,
    payDay: Date,
    hasDirectDeposit: boolean,
  ): Date {
    let dueDate = new Date(payDay);

    if (!hasDirectDeposit) {
      dueDate.setDate(dueDate.getDate() + 1);
    }

    // Use strategy pattern to handle different pay schedules
    const payScheduleStrategy = PayScheduleStrategyFactory.createStrategy(paySpan);
    dueDate = payScheduleStrategy.adjustForMinimumDays(dueDate, fundDay, this.MIN_DAYS_AFTER_FUNDING);

    return this._adjustForHolidaysAndWeekends(
      fundDay,
      holidays,
      paySpan,
      dueDate,
      hasDirectDeposit,
    );
  }

  private _adjustForHolidaysAndWeekends(
    fundDay: Date,
    holidays: Date[],
    paySpan: PaySpan,
    dueDate: Date,
    hasDirectDeposit: boolean,
  ): Date {
    const adjustedDate = new Date(dueDate);
    if (dateListIncludes(holidays, dueDate)) {
      adjustedDate.setDate(adjustedDate.getDate() - 1);

      if (isOnDayOfWeek(DayOfWeek.SUNDAY, adjustedDate)) {
        adjustedDate.setDate(adjustedDate.getDate() - 2);
      } else if (isOnDayOfWeek(DayOfWeek.SATURDAY, adjustedDate)) {
        adjustedDate.setDate(adjustedDate.getDate() - 1);
      }

      return this._adjustForHolidaysAndWeekends(
        fundDay,
        holidays,
        paySpan,
        adjustedDate,
        hasDirectDeposit,
      );
    }

    if (isOnDayOfWeek(DayOfWeek.SUNDAY, adjustedDate)) {
      adjustedDate.setDate(adjustedDate.getDate() + 1);
      return this._adjustForHolidaysAndWeekends(
        fundDay,
        holidays,
        paySpan,
        adjustedDate,
        hasDirectDeposit,
      );
    }

    if (isOnDayOfWeek(DayOfWeek.SATURDAY, adjustedDate)) {
      adjustedDate.setDate(adjustedDate.getDate() + 2);
      return this._adjustForHolidaysAndWeekends(
        fundDay,
        holidays,
        paySpan,
        adjustedDate,
        hasDirectDeposit,
      );
    }

    return adjustedDate;
  }
}

export { PayDateCalculator };