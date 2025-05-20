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
}
