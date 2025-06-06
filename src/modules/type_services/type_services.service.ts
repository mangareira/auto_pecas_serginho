import { Injectable } from '@nestjs/common';
import { ITypeServicesRepository } from './repository/type_services.repository';
import { CreateTypeServicesDto } from './dto/create_type_services.respository';
import { TypeServices } from './entities/type_services.entity';

@Injectable()
export class TypeServicesService {
  constructor(private typeServicesRepository: ITypeServicesRepository) {}

  async create(data: CreateTypeServicesDto) {
    const type_services = this.typeServicesRepository.create(data);

    return type_services;
  }

  async getAll() {
    const type_services = this.typeServicesRepository.getAll();

    return type_services;
  }

  async getById(id: string) {
    const type_service = this.typeServicesRepository.getById(id);

    return type_service;
  }

  async update(data: TypeServices, id: string) {
    const type_service = this.typeServicesRepository.update(data, id);

    return type_service;
  }

  async deleteById(id: string) {
    await this.typeServicesRepository.deleteById(id);

    return;
  }

  async deleteBulk(ids: Array<string>) {
    await this.typeServicesRepository.deleteBulk(ids);

    return null;
  }
}
