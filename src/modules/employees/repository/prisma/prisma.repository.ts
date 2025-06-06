import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from 'src/modules/employees/dto/create-employees.dto';
import { Employee } from 'src/modules/employees/entities/employees.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { IEmployeesRepository } from '../employee.repository';

@Injectable()
export class EmployeesPrismaRepository implements IEmployeesRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateEmployeeDto): Promise<Employee> {
    return this.prisma.employees.create({
      data,
    });
  }

  async getAll(): Promise<Employee[]> {
    const employees = this.prisma.employees.findMany({
      include: {
        services: {
          include: {
            type_services: true,
          },
        },
      },
    });

    return employees;
  }
  async getById(id: string): Promise<Employee | null> {
    const employee = this.prisma.employees.findUnique({
      where: {
        id,
      },
      include: {
        services: {
          include: {
            type_services: true,
          },
        },
      },
    });

    return employee;
  }
  async update(
    data: Omit<Employee, 'services'>,
    id: string,
  ): Promise<Employee> {
    const employee = this.prisma.employees.update({
      where: {
        id,
      },
      data,
    });

    return employee;
  }
  async deleteById(id: string): Promise<null> {
    await this.prisma.employees.delete({
      where: {
        id,
      },
    });

    return null;
  }
  async deleteBulk(ids: Array<string>): Promise<null> {
    await this.prisma.employees.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return null;
  }
}
