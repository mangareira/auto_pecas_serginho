import { Injectable } from '@nestjs/common';
import { IServicesRepository } from './repository/services.repository';
import { Service } from './entities/services.entity';
import { CreateServiceDto } from './dto/create-service.dto';

@Injectable()
export class ServicesService {
  constructor(private servicesService: IServicesRepository) {}

  async create(data: CreateServiceDto): Promise<Service> {
    const service = this.servicesService.create(data);

    return service;
  }
}
