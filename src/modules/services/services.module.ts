import { Module } from '@nestjs/common';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { IServicesRepository } from './repository/services.repository';
import { ServicePrismaRepository } from './repository/prisma/prisma.repository';

@Module({
  controllers: [ServicesController],
  providers: [
    ServicesService,
    PrismaService,
    { provide: IServicesRepository, useClass: ServicePrismaRepository },
  ],
})
export class ServicesModule {}
