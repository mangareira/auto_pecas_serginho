import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { TypeServicesService } from './type_services.service';
import { ZodPipe } from 'src/common/pipes/zod/zod.pipe';
import {
  CreateTypeServicesDto,
  createTypeServicesSchema,
} from './dto/create_type_services.respository';

@Controller('type-services')
export class TypeServicesController {
  constructor(private typeServicesService: TypeServicesService) {}

  @Post()
  @UsePipes(new ZodPipe(createTypeServicesSchema))
  async create(@Body() createTypeServices: CreateTypeServicesDto) {
    const type_services = this.typeServicesService.create(createTypeServices);

    return type_services;
  }
}
