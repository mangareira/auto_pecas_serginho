// src/services/repositories/service-prisma.repository.ts
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
}
