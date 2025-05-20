import { Module } from '@nestjs/common';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { IEmployeesRepository } from './repository/employee.repository';
import { EmployeesPrismaRepository } from './repository/prisma/prisma.repository';

@Module({
  controllers: [EmployeesController],
  providers: [
    EmployeesService,
    PrismaService,
    {
      provide: IEmployeesRepository,
      useClass: EmployeesPrismaRepository,
    },
  ],
})
export class EmployeesModule {}
