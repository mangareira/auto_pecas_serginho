import { CreateServiceDto } from '../../dto/create-service.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { IServicesRepository } from '../services.repository';
import { Service } from '../../entities/services.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ServicePrismaRepository implements IServicesRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateServiceDto): Promise<Service> {
    const service = await this.prisma.service.create({
      data: {
        ...data,
        type_services: {
          connect: data.type_services.map((id) => ({ id })),
        },
        items: {
          connect: data.items?.map((id) => ({ id })),
        },
      },
      include: {
        type_services: true,
        items: true,
      },
    });

    return service;
  }
  async getAll(): Promise<Service[]> {
    return this.prisma.service.findMany({
      include: {
        type_services: true,
        employees: true,
        helpers: true,
        items: true,
      },
    });
  }

  async getById(id: string): Promise<Service | null> {
    return this.prisma.service.findUnique({
      where: { id },
      include: {
        type_services: true,
        employees: true,
        helpers: true,
        items: true,
      },
    });
  }
  async update(data: CreateServiceDto, id: string): Promise<Service> {
    const service = this.prisma.service.update({
      where: { id },
      data: {
        client: data.client,
        date: data.date,
        diagnoses: data.diagnoses,
        employees: {
          connect: {
            id: data.employeesId,
          },
        },
        type_services: {
          set: data.type_services.map((id) => ({ id })),
        },
        items: {
          set: data.items?.map((id) => ({ id })),
        },
        enterprise: data.enterprise,
        particular: data.particular,
        phone: data.phone,
        plate: data.plate,
        value: data.value,
        vehicle: data.vehicle,
        enterprise_name: data.enterprise_name,
        helpers: data.helpersId
          ? {
              connect: {
                id: data.helpersId,
              },
            }
          : undefined,
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
