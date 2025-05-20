import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employees.dto';
import { Employee } from './entities/employees.entity';
import { IEmployeesRepository } from './repository/employee.repository';

@Injectable()
export class EmployeesService {
  constructor(private employeeRepository: IEmployeesRepository) {}

  async create(data: CreateEmployeeDto): Promise<Employee> {
    const employee = await this.employeeRepository.create(data);

    return employee;
  }
}
