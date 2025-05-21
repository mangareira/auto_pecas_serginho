import { Module } from '@nestjs/common';
import { HelpersService } from './helpers.service';
import { HelpersController } from './helpers.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { IHelpersRepository } from './repository/helpers.repository';
import { HelpersPrismaRepository } from './repository/prisma/helpers-prisma.repository';

@Module({
  controllers: [HelpersController],
  providers: [
    HelpersService,
    PrismaService,
    { provide: IHelpersRepository, useClass: HelpersPrismaRepository },
  ],
})
export class HelpersModule {}
