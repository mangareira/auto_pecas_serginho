import { Injectable } from '@nestjs/common';
import { IHelpersRepository } from '../helpers.repository';
import { CreateHelperDto } from '../../dto/create-helper.dto';
import { Helper } from '../../entities/helper.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HelpersPrismaRepository implements IHelpersRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateHelperDto): Promise<Helper> {
    const helper = this.prisma.helpers.create({
      data,
    });

    return helper;
  }

  async getAll(): Promise<Helper[]> {
    const helpers = this.prisma.helpers.findMany();

    return helpers;
  }
  async getById(id: string): Promise<Helper | null> {
    const helper = this.prisma.helpers.findUnique({
      where: {
        id,
      },
      include: {
        services: {
          include: {
            type_services: true,
          },
        },
      },
    });

    return helper;
  }
  async update(data: Omit<Helper, 'services'>, id: string): Promise<Helper> {
    const helper = this.prisma.helpers.update({
      where: {
        id,
      },
      data,
    });

    return helper;
  }
  async deleteById(id: string): Promise<null> {
    await this.prisma.helpers.delete({
      where: {
        id,
      },
    });

    return null;
  }
  async deleteBulk(ids: Array<string>): Promise<null> {
    await this.prisma.helpers.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return null;
  }
}
