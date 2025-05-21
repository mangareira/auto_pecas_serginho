import { Injectable } from '@nestjs/common';
import { ITypeServicesRepository } from './repository/type_services.repository';
import { CreateTypeServicesDto } from './dto/create_type_services.respository';

@Injectable()
export class TypeServicesService {
  constructor(private typeServicesRepository: ITypeServicesRepository) {}

  async create(data: CreateTypeServicesDto) {
    const type_services = this.typeServicesRepository.create(data);

    return type_services;
  }
}
