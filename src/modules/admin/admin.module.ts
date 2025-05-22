import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { IAdminRepository } from './repository/admin.repository';
import { AdminPrismaRepository } from './repository/prisma/prisma.repository';

@Module({
  controllers: [AdminController],
  providers: [
    AdminService,
    PrismaService,
    {
      provide: IAdminRepository,
      useClass: AdminPrismaRepository,
    },
  ],
})
export class AdminModule {}
