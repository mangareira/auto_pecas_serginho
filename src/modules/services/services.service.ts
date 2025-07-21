import { Injectable } from '@nestjs/common';
import { IServicesRepository } from './repository/services.repository';
import { Service } from './entities/services.entity';
import { CreateServiceDto } from './dto/create-service.dto';

@Injectable()
export class ServicesService {
  constructor(private servicesRepository: IServicesRepository) {}

  async create(data: CreateServiceDto): Promise<Service> {
    const service = this.servicesRepository.create(data);

    return service;
  }

  async getAll() {
    const services = this.servicesRepository.getAll();

    return services;
  }

  async getById(id: string) {
    const service = this.servicesRepository.getById(id);

    return service;
  }

  async update(data: CreateServiceDto, id: string) {
    const service = this.servicesRepository.update(data, id);

    return service;
  }

  async deleteById(id: string) {
    await this.servicesRepository.deleteById(id);

    return;
  }

  async deleteBulk(ids: Array<string>) {
    await this.servicesRepository.deleteBulk(ids);

    return null;
  }
}
