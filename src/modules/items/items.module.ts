import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { IItemsRepository } from './repository/items.repository';
import { ItemsRepositoryPrisma } from './repository/prisma/prisma.repository';

@Module({
  controllers: [ItemsController],
  providers: [
    ItemsService,
    PrismaService,
    {
      provide: IItemsRepository,
      useClass: ItemsRepositoryPrisma,
    },
  ],
})
export class ItemsModule {}
