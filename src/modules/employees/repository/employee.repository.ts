import { CreateEmployeeDto } from '../dto/create-employees.dto';
import { Employee } from '../entities/employees.entity';

export abstract class IEmployeesRepository {
  abstract create(data: CreateEmployeeDto): Promise<Employee>;
}
