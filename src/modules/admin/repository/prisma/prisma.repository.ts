import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAdminDto } from '../../dto/create-admin.dto';
import { Admin } from '../../entities/admin.entity';
import { IAdminRepository } from '../admin.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminPrismaRepository implements IAdminRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateAdminDto): Promise<Admin> {
    const admin = this.prisma.admin.create({
      data,
    });

    return admin;
  }

  async getAll(): Promise<Admin[]> {
    const admins = this.prisma.admin.findMany();

    return admins;
  }

  async getById(id: string): Promise<Admin | null> {
    const admin = this.prisma.admin.findUnique({
      where: {
        id,
      },
    });

    return admin;
  }

  async update(data: Admin): Promise<Admin> {
    console.log(data);

    const admin = this.prisma.admin.update({
      where: {
        id: data.id,
      },
      data,
    });

    return admin;
  }
}
