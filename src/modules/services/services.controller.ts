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

  @Post('/bulk-delete')
  bulkDelete(@Body() ids: Array<string>) {
    return this.servicesService.deleteBulk(ids);
  }

  @Get()
  getAll() {
    return this.servicesService.getAll();
  }

  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.servicesService.getById(id);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() service: Service) {
    return this.servicesService.update(service, id);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.servicesService.deleteById(id);
  }
}
