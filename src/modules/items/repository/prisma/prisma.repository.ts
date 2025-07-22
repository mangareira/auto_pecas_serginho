import { Injectable } from '@nestjs/common';
import { IItemsRepository } from '../items.repository';
import { CreateItemDto } from '../../dto/create-item.dto';
import { Item } from '../../entities/item.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ItemsRepositoryPrisma implements IItemsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateItemDto): Promise<Item> {
    return this.prisma.items.create({ data });
  }

  async getAll(): Promise<Item[]> {
    return this.prisma.items.findMany();
  }

  async getById(id: string): Promise<Item | null> {
    return this.prisma.items.findUnique({ where: { id } });
  }

  async update(data: Item, id: string): Promise<Item> {
    return this.prisma.items.update({
      where: { id },
      data,
    });
  }

  async deleteById(id: string): Promise<null> {
    await this.prisma.items.delete({ where: { id } });
    return null;
  }

  async deleteBulk(ids: Array<string>): Promise<null> {
    await this.prisma.items.deleteMany({
      where: { id: { in: ids } },
    });
    return null;
  }
}
