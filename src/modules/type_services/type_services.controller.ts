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
import { TypeServicesService } from './type_services.service';
import { ZodPipe } from 'src/common/pipes/zod/zod.pipe';
import {
  CreateTypeServicesDto,
  createTypeServicesSchema,
} from './dto/create_type_services.respository';
import { TypeServices } from './entities/type_services.entity';

@Controller('type-services')
export class TypeServicesController {
  constructor(private typeServicesService: TypeServicesService) {}

  @Post()
  @UsePipes(new ZodPipe(createTypeServicesSchema))
  async create(@Body() createTypeServices: CreateTypeServicesDto) {
    const type_services = this.typeServicesService.create(createTypeServices);

    return type_services;
  }

  @Post('/bulk-delete')
  bulkDelete(@Body() ids: Array<string>) {
    return this.typeServicesService.deleteBulk(ids);
  }

  @Get()
  getAll() {
    return this.typeServicesService.getAll();
  }

  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.typeServicesService.getById(id);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() type_service: TypeServices) {
    return this.typeServicesService.update(type_service, id);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.typeServicesService.deleteById(id);
  }
}
