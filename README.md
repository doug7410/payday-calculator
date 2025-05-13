# PayDateCalculator

A tool for calculating the next payday.

This project contains one class in `Calculator.ts` called `PayDateCalculator`

## Project Requirements
`node >= 22.15.0`

## PayDateCalculator API Documentation

### Main Method

#### `calculateDueDate()`

Determines the first available due date for a loan following its funding date.

```typescript
public calculateDueDate(
  fundDay: Date,
  holidays: Date[],
  paySpan: 'weekly' | 'bi-weekly' | 'monthly',
  payDay: Date,
  hasDirectDeposit: boolean
): Date
```

##### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `fundDay` | `Date` | The date when the loan was funded |
| `holidays` | `Date[]` | Array of holiday dates to avoid for due dates |
| `paySpan` | `'weekly' \| 'bi-weekly' \| 'monthly'` | The frequency at which the customer is paid |
| `payDay` | `Date` | A reference date for one of the customer's paydays |
| `hasDirectDeposit` | `boolean` | Whether the customer receives their paycheck via direct deposit |

##### Return Value

Returns a `Date` object representing the calculated due date that meets the following criteria:

- At least 10 days after the funding date
- Adjusted based on the customer's pay schedule
- Not falling on a weekend (adjusted forward)
- Not falling on a holiday (adjusted backward)
- Adjusted for direct deposit status

### Business Rules

1. **Direct Deposit Handling:**
    - If the customer does not have direct deposit, add 1 day to the initial due date

2. **Minimum Time Since Funding:**
    - Due date must be at least 10 days after funding
    - If less than 10 days, adjust forward based on pay span:
        - Weekly: Add 7 days
        - Bi-weekly: Add 14 days
        - Monthly: Add 1 month

3. **Weekend Adjustments:**
    - If due date falls on Saturday: Add 2 days (move to Monday)
    - If due date falls on Sunday: Add 1 day (move to Monday)

4. **Holiday Adjustments:**
    - If due date falls on a holiday: Subtract 1 day
    - If the day before a holiday is a weekend, adjust appropriately

5. **Combined Adjustments:**
    - Recursive adjustment to ensure all criteria are met

## Setup

1. Install dependencies:
```bash
npm install
```

## Testing
This project uses Jest for unit testing. 

Run tests with:
```bash
npm test
```

## Development
For development, it's useful to watch the test while implementing new features or refactoring.
```bash
npm run test:watch
```