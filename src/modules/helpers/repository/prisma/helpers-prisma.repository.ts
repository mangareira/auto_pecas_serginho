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
}
