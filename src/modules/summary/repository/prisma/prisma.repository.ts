import { PrismaService } from 'src/prisma/prisma.service';
import { ISummaryRepository } from '../summary.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SummaryPrismaRepository implements ISummaryRepository {
  constructor(private prisma: PrismaService) {}
  async getPeriodData(
    startDate: Date,
    endDate: Date,
  ): Promise<{ income: number; expenses: number; remaining: number }> {
    const result = await this.prisma.service.aggregate({
      _sum: { value: true },
      where: {
        date: { gte: startDate, lte: endDate },
      },
    });
    const total = result._sum.value || 0;

    return {
      income: total,
      expenses: 0,
      remaining: total,
    };
  }
  async getDailyData(
    startDate: Date,
    endDate: Date,
  ): Promise<{ date: Date; income: number; expenses: number }[]> {
    const result = await this.prisma.service.groupBy({
      by: ['date'],
      _sum: { value: true },
      where: {
        date: { gte: startDate, lte: endDate },
      },
      orderBy: { date: 'asc' },
    });

    return result.map((item) => ({
      date: item.date,
      income: item._sum.value || 0,
      expenses: 0,
    }));
  }

  async getEmployeesData(
    startDate: Date,
    endDate: Date,
  ): Promise<{ name: string; value: number }[]> {
    const result = await this.prisma.employees.findMany({
      select: {
        name: true,
        services: {
          select: { id: true },
          where: {
            date: { gte: startDate, lte: endDate },
          },
        },
      },
    });

    return result.map((employee) => ({
      name: employee.name,
      value: employee.services.length,
    }));
  }
}
