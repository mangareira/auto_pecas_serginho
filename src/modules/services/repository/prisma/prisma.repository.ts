import { CreateServiceDto } from '../../dto/create-service.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { IServicesRepository } from '../services.repository';
import { Service } from '../../entities/services.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ServicePrismaRepository implements IServicesRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateServiceDto): Promise<Service> {
    const service = this.prisma.service.create({
      data: {
        ...data,
        type_services: {
          connect: data.type_services.map((id) => ({ id })),
        },
      },
      include: {
        type_services: true,
      },
    });

    return service;
  }
  async getAll(): Promise<Service[]> {
    return this.prisma.service.findMany({
      include: {
        type_services: true,
      },
    });
  }

  async getById(id: string): Promise<Service | null> {
    return this.prisma.service.findUnique({
      where: { id },
      include: {
        type_services: true,
      },
    });
  }
  async update(data: Service, id: string): Promise<Service> {
    const service = this.prisma.service.update({
      where: { id },
      data: {
        ...data,
        type_services: {
          connect: data.type_services.map((typeService) => ({
            id: typeService.id,
          })),
        },
      },
      include: {
        type_services: true,
      },
    });

    return service;
  }
  async deleteById(id: string): Promise<null> {
    const service = this.prisma.service.delete({
      where: { id },
    });

    return service.then(() => null);
  }
  async deleteBulk(ids: Array<string>): Promise<null> {
    const service = this.prisma.service.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return service.then(() => null);
  }
}
