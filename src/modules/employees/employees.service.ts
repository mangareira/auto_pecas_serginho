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

  async getAll() {
    const employees = this.employeeRepository.getAll();

    return employees;
  }

  async getById(id: string) {
    const employee = this.employeeRepository.getById(id);

    return employee;
  }

  async update(data: Omit<Employee, 'services'>, id: string) {
    const employee = this.employeeRepository.update(data, id);

    return employee;
  }

  async deleteById(id: string) {
    await this.employeeRepository.deleteById(id);

    return;
  }

  async deleteBulk(ids: Array<string>) {
    await this.employeeRepository.deleteBulk(ids);

    return null;
  }
}
