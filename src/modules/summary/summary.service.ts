import { Injectable } from '@nestjs/common';
import { subDays, parse, differenceInDays, isSameDay } from 'date-fns';
import { ISummaryRepository } from './repository/summary.repository';

@Injectable()
export class SummaryService {
  constructor(private summaryRepository: ISummaryRepository) {}

  async find(from?: string, to?: string) {
    const defaultTo = new Date();
    const defaultFrom = subDays(defaultTo, 30);

    const startDate = from
      ? parse(from, 'yyyy-MM-dd', new Date())
      : defaultFrom;
    const endDate = to ? parse(to, 'yyyy-MM-dd', new Date()) : defaultTo;

    const monthStart = new Date(endDate.getFullYear(), endDate.getMonth(), 1);
    const prevMonthStart = new Date(
      monthStart.getFullYear(),
      monthStart.getMonth() - 1,
      1,
    );
    const prevMonthEnd = subDays(monthStart, 1);

    const annualStart = subDays(endDate, 365);
    const lastAnnualStart = subDays(annualStart, 365);
    const lastAnnualEnd = subDays(endDate, 365);

    const monthlyData = await this.summaryRepository.getPeriodData(
      monthStart,
      endDate,
    );
    const lastMonthData = await this.summaryRepository.getPeriodData(
      prevMonthStart,
      prevMonthEnd,
    );

    const annualData = await this.summaryRepository.getPeriodData(
      annualStart,
      endDate,
    );
    const lastAnnualData = await this.summaryRepository.getPeriodData(
      lastAnnualStart,
      lastAnnualEnd,
    );

    const dailyData = await this.summaryRepository.getDailyData(
      monthStart,
      endDate,
    );
    const days = this.fillMissingDays(dailyData, monthStart, endDate);
    const employeesData = await this.summaryRepository.getEmployeesData(
      startDate,
      endDate,
    );

    const sortedEmployees = [...employeesData].sort(
      (a, b) => b.value - a.value,
    );
    const topEmployees = sortedEmployees.slice(0, 3);
    const otherEmployees = sortedEmployees.slice(3);
    const otherSum = otherEmployees.reduce((sum, emp) => sum + emp.value, 0);

    const finalEmployees = topEmployees;
    if (otherEmployees.length > 0) {
      finalEmployees.push({
        name: 'Other',
        value: otherSum,
      });
    }

    const incomeChange = this.calculatePercentageChange(
      monthlyData.income,
      lastMonthData.income,
    );

    const expensesChange = this.calculatePercentageChange(
      monthlyData.expenses,
      lastMonthData.expenses,
    );

    const remainingChange = this.calculatePercentageChange(
      annualData.remaining,
      lastAnnualData.remaining,
    );

    return {
      remainingAmount: annualData.remaining,
      remainingChange,
      incomeAmount: monthlyData.income,
      incomeChange,
      expensesAmount: monthlyData.expenses,
      expensesChange,
      employees: finalEmployees,
      days,
    };
  }

  private calculatePercentageChange(current: number, previous: number): number {
    if (previous === 0) return current !== 0 ? 100 : 0;
    return ((current - previous) / previous) * 100;
  }
  private fillMissingDays(
    activeDays: { date: Date; income: number }[],
    startDate: Date,
    endDate: Date,
  ) {
    const days = differenceInDays(endDate, startDate) + 1;
    const result: { date: Date; income: number }[] = [];

    for (let i = 0; i < days; i++) {
      const date = subDays(endDate, days - i - 1);
      const activeDay = activeDays.find((d) => isSameDay(d.date, date));

      result.push({
        date,
        income: activeDay?.income || 0,
      });
    }

    return result;
  }
}
