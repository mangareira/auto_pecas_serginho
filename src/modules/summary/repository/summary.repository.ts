export abstract class ISummaryRepository {
  abstract getPeriodData(
    startDate: Date,
    endDate: Date,
  ): Promise<{ income: number; expenses: number; remaining: number }>;
  abstract getDailyData(
    startDate: Date,
    endDate: Date,
  ): Promise<{ date: Date; income: number; expenses: number }[]>;
  abstract getEmployeesData(
    startDate: Date,
    endDate: Date,
  ): Promise<{ name: string; value: number }[]>;
}
