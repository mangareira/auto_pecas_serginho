// summary.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { SummaryService } from './summary.service';

@Controller('summary')
export class SummaryController {
  constructor(private readonly summaryService: SummaryService) {}

  @Get()
  find(@Query('from') from?: string, @Query('to') to?: string) {
    return this.summaryService.find(from, to);
  }
}
