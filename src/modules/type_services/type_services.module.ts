import { Module } from '@nestjs/common';
import { TypeServicesController } from './type_services.controller';
import { TypeServicesService } from './type_services.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ITypeServicesRepository } from './repository/type_services.repository';
import { TypeServicesPrismaRepository } from './repository/prisma/type_services_prisma.repository';

@Module({
  controllers: [TypeServicesController],
  providers: [
    TypeServicesService,
    PrismaService,
    {
      provide: ITypeServicesRepository,
      useClass: TypeServicesPrismaRepository,
    },
  ],
})
export class TypeServicesModule {}
