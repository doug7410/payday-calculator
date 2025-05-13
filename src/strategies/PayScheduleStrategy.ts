export interface PayScheduleStrategy {
  adjustForMinimumDays(dueDate: Date, fundDay: Date, minDays: number): Date;
}