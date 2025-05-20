import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ZodPipe } from 'src/common/pipes/zod/zod.pipe';
import {
  CreateServiceDto,
  CreateServiceSchema,
} from './dto/create-service.dto';
import { Service } from './entities/services.entity';

@Controller('services')
export class ServicesController {
  constructor(private servicesService: ServicesService) {}

  @Post()
  @UsePipes(new ZodPipe(CreateServiceSchema))
  async create(@Body() createService: CreateServiceDto): Promise<Service> {
    return this.servicesService.create(createService);
  }
}
