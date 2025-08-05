import { Module } from '@nestjs/common';
import { SummaryService } from './summary.service';
import { SummaryController } from './summary.controller';
import { ISummaryRepository } from './repository/summary.repository';
import { SummaryPrismaRepository } from './repository/prisma/prisma.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [SummaryController],
  providers: [
    SummaryService,
    PrismaService,
    {
      provide: ISummaryRepository,
      useClass: SummaryPrismaRepository,
    },
  ],
})
export class SummaryModule {}
