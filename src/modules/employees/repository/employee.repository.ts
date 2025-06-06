import { CreateEmployeeDto } from '../dto/create-employees.dto';
import { Employee } from '../entities/employees.entity';

export abstract class IEmployeesRepository {
  abstract create(data: CreateEmployeeDto): Promise<Employee>;
  abstract getAll(): Promise<Employee[]>;
  abstract getById(id: string): Promise<Employee | null>;
  abstract update(
    data: Omit<Employee, 'services'>,
    id: string,
  ): Promise<Employee>;
  abstract deleteById(id: string): Promise<null>;
  abstract deleteBulk(ids: Array<string>): Promise<null>;
}
