export interface DateAdjuster {
  setNext(next: DateAdjuster): DateAdjuster;
  
  adjust(date: Date, holidays: Date[]): Date;
}

