import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import {
  CreateEmployeeDto,
  createEmployeeSchema,
} from './dto/create-employees.dto';
import { ZodPipe } from 'src/common/pipes/zod/zod.pipe';
import { Employee } from './entities/employees.entity';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  @UsePipes(new ZodPipe(createEmployeeSchema))
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @Post('/bulk-delete')
  bulkDelete(@Body() ids: Array<string>) {
    return this.employeesService.deleteBulk(ids);
  }

  @Get()
  getAll() {
    return this.employeesService.getAll();
  }

  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.employeesService.getById(id);
  }

  @Put('/:id')
  update(
    @Param('id') id: string,
    @Body() employee: Omit<Employee, 'services'>,
  ) {
    return this.employeesService.update(employee, id);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.employeesService.deleteById(id);
  }
}
