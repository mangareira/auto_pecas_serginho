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
    const helpers = this.servicesRepository.getAll();

    return helpers;
  }

  async getById(id: string) {
    const helper = this.servicesRepository.getById(id);

    return helper;
  }

  async update(data: CreateServiceDto, id: string) {
    const helper = this.servicesRepository.update(data, id);

    return helper;
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
