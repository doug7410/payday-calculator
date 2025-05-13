import { dateListIncludes, isOnDayOfWeek } from './DateUtils.js';

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
  public calculateDueDate(
    fundDay: Date,
    holidays: Date[],
    paySpan: 'weekly' | 'bi-weekly' | 'monthly',
    payDay: Date,
    hasDirectDeposit: boolean,
  ): Date {
    let dueDate = new Date(payDay);

    if (!hasDirectDeposit) {
      dueDate.setDate(dueDate.getDate() + 1);
    }

    dueDate = this._adjustForRecentFundingDate(dueDate, fundDay, paySpan);

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
    paySpan: 'weekly' | 'bi-weekly' | 'monthly',
    dueDate: Date,
    hasDirectDeposit: boolean,
  ): Date {
    const adjustedDate = new Date(dueDate);
    if (dateListIncludes(holidays, dueDate)) {
      adjustedDate.setDate(adjustedDate.getDate() - 1);

      if (isOnDayOfWeek('sunday', adjustedDate)) {
        adjustedDate.setDate(adjustedDate.getDate() - 2);
      } else if (isOnDayOfWeek('saturday', adjustedDate)) {
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

    if (isOnDayOfWeek('sunday', adjustedDate)) {
      adjustedDate.setDate(adjustedDate.getDate() + 1);
      return this._adjustForHolidaysAndWeekends(
        fundDay,
        holidays,
        paySpan,
        adjustedDate,
        hasDirectDeposit,
      );
    }

    if (isOnDayOfWeek('saturday', adjustedDate)) {
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

  private _adjustForRecentFundingDate(
    dueDate: Date,
    fundDay: Date,
    paySpan: 'weekly' | 'bi-weekly' | 'monthly',
  ): Date {
    const newDueDate = new Date(dueDate);
    const daysSinceFundDay = Math.floor(
      (newDueDate.getTime() - fundDay.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (daysSinceFundDay < 10) {
      if (paySpan === 'weekly') {
        newDueDate.setDate(newDueDate.getDate() + 7);
      } else if (paySpan === 'bi-weekly') {
        newDueDate.setDate(newDueDate.getDate() + 14);
      } else {
        newDueDate.setMonth(newDueDate.getMonth() + 1);
      }
    }

    return newDueDate;
  }
}

export { PayDateCalculator };
