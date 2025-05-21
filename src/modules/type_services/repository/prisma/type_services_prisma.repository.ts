import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTypeServicesDto } from '../../dto/create_type_services.respository';
import { TypeServices } from '../../entities/type_services.entity';
import { ITypeServicesRepository } from '../type_services.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TypeServicesPrismaRepository implements ITypeServicesRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateTypeServicesDto): Promise<TypeServices> {
    const type_services = this.prisma.type_services.create({
      data,
    });

    return type_services;
  }
}
