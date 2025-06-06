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

  async getAll(): Promise<TypeServices[]> {
    const type_services = this.prisma.type_services.findMany();

    return type_services;
  }
  async getById(id: string): Promise<TypeServices | null> {
    const type_service = this.prisma.type_services.findUnique({
      where: {
        id,
      },
    });

    return type_service;
  }
  async update(
    data: Omit<TypeServices, 'services'>,
    id: string,
  ): Promise<TypeServices> {
    const type_service = this.prisma.type_services.update({
      where: {
        id,
      },
      data,
    });

    return type_service;
  }
  async deleteById(id: string): Promise<null> {
    await this.prisma.type_services.delete({
      where: {
        id,
      },
    });

    return null;
  }
  async deleteBulk(ids: Array<string>): Promise<null> {
    await this.prisma.type_services.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return null;
  }
}
