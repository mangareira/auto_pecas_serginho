import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import {
  CreateEmployeeDto,
  createEmployeeSchema,
} from './dto/create-employees.dto';
import { ZodPipe } from 'src/common/pipes/zod/zod.pipe';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  @UsePipes(new ZodPipe(createEmployeeSchema))
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }
}
