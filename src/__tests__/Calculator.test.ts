import { describe } from '@jest/globals';
import { PayDateCalculator } from '../Calculator.js';

describe('Calculator', () => {
  const newYearsDay = new Date('2025-01-01 EST');
  const passover = new Date('2025-04-12 EST');
  const easter = new Date('2025-04-20 EST');
  const independenceDay = new Date('2025-07-04 EST');
  const thanksGiving = new Date('2025-11-27 EST');
  const memorialDay = new Date('2025-05-26 EST');
  const holidays = [newYearsDay, passover, easter, independenceDay, thanksGiving, memorialDay];
  const calculator = new PayDateCalculator();

  it('should return a date object', () => {
    const fundDate = new Date();
    const paySpan = 'weekly';
    const payDay = new Date();
    const hasDirectDeposit = false;
    const dueDate = calculator.calculateDueDate(
      fundDate,
      holidays,
      paySpan,
      payDay,
      hasDirectDeposit,
    );
    expect(dueDate).toBeInstanceOf(Date);
  });

  const directDepositCases = [true, false];

  describe.each(directDepositCases)('handles direct deposit is %s', hasDirectDeposit => {
    describe('due date not on a weekend', () => {
      describe('due date not on a holiday', () => {
        it('is at least 10 days after fund day', () => {
          let expectedPayDate = hasDirectDeposit ? '2025-01-30' : '2025-01-31';
          const fundDate = new Date('2025-01-15 EST');
          const paySpan = 'weekly';
          const payDay = new Date('2025-01-30 EST');
          const dueDate = calculator.calculateDueDate(
            fundDate,
            holidays,
            paySpan,
            payDay,
            hasDirectDeposit,
          );
          expect(dueDate.toISOString().substring(0, 10)).toEqual(expectedPayDate);
        });

        describe('is less then 10 days after fund day', () => {
          it('weekly pay span', () => {
            const expectedPayDate = hasDirectDeposit ? '2025-01-31' : '2025-02-03';
            const fundDate = new Date('2025-01-20 EST');
            const paySpan = 'weekly';
            const payDay = new Date('2025-1-24 EST');
            const dueDate = calculator.calculateDueDate(
              fundDate,
              holidays,
              paySpan,
              payDay,
              hasDirectDeposit,
            );
            expect(dueDate.toISOString().substring(0, 10)).toEqual(expectedPayDate);
          });
          it('bi-weekly pay span', () => {
            const expectedPayDate = hasDirectDeposit ? '2025-02-07' : '2025-02-10';
            const fundDate = new Date('2025-01-20 EST');
            const paySpan = 'bi-weekly';
            const payDay = new Date('2025-1-24 EST');
            const dueDate = calculator.calculateDueDate(
              fundDate,
              holidays,
              paySpan,
              payDay,
              hasDirectDeposit,
            );
            expect(dueDate.toISOString().substring(0, 10)).toEqual(expectedPayDate);
          });
          it('monthly pay span', () => {
            const expectedPayDate = hasDirectDeposit ? '2025-02-24' : '2025-02-25';
            const fundDate = new Date('2025-01-20 EST');
            const paySpan = 'monthly';
            const payDay = new Date('2025-1-24 EST');

            const dueDate = calculator.calculateDueDate(
              fundDate,
              holidays,
              paySpan,
              payDay,
              hasDirectDeposit,
            );
            expect(dueDate.toISOString().substring(0, 10)).toEqual(expectedPayDate);
          });
        });
      });
      describe('due date is on a holiday', () => {
        it('previous day is not on a weekend', () => {
          const expectedPayDate = hasDirectDeposit ? '2025-07-03' : '2025-07-07';
          const fundDate = new Date('2025-01-15 EST');
          const paySpan = 'weekly';
          const payDay = new Date(independenceDay);

          const dueDate = calculator.calculateDueDate(
            fundDate,
            holidays,
            paySpan,
            payDay,
            hasDirectDeposit,
          );
          expect(dueDate.toISOString().substring(0, 10)).toEqual(expectedPayDate);
        });

        it('previous day is on a weekend', () => {
          const expectedPayDate = hasDirectDeposit ? '2025-05-23' : '2025-05-27';
          const fundDate = new Date('2025-01-01 EST');
          const paySpan = 'weekly';
          const payDay = new Date(memorialDay);
          const dueDate = calculator.calculateDueDate(
            fundDate,
            holidays,
            paySpan,
            payDay,
            hasDirectDeposit,
          );
          expect(dueDate.toISOString().substring(0, 10)).toEqual(expectedPayDate);
        });
      });
    });
    describe('due date is on a weekend', () => {
      it('adds two days when Saturday', () => {
        const expectedPayDate = '2025-05-19';
        const fundDate = new Date('2025-01-15 EST');
        const paySpan = 'weekly';
        const payDay = new Date('2025-05-17 EST');

        const dueDate = calculator.calculateDueDate(
          fundDate,
          holidays,
          paySpan,
          payDay,
          hasDirectDeposit,
        );
        expect(dueDate.toISOString().substring(0, 10)).toEqual(expectedPayDate);
      });
      it('adds one day when Sunday', () => {
        const expectedPayDate = '2025-05-19';
        const fundDate = new Date('2025-01-15 EST');
        const paySpan = 'weekly';
        const payDay = new Date('2025-05-18 EST');
        const dueDate = calculator.calculateDueDate(
          fundDate,
          holidays,
          paySpan,
          payDay,
          hasDirectDeposit,
        );
        expect(dueDate.toISOString().substring(0, 10)).toEqual(expectedPayDate);
      });
      it('goes back to the first non holiday when due date is on the weekend and monday is a holiday', () => {
        const expectedPayDate = '2025-05-23';
        const fundDate = new Date('2025-01-15 EST');
        const paySpan = 'weekly';
        const payDay = new Date('2025-05-24 EST');

        const dueDate = calculator.calculateDueDate(
          fundDate,
          holidays,
          paySpan,
          payDay,
          hasDirectDeposit,
        );
        expect(dueDate.toISOString().substring(0, 10)).toEqual(expectedPayDate);
      });
    });
  });
});
