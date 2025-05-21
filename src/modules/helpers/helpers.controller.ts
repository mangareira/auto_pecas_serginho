import { Controller, Post, Body } from '@nestjs/common';
import { HelpersService } from './helpers.service';
import { CreateHelperDto } from './dto/create-helper.dto';

@Controller('helpers')
export class HelpersController {
  constructor(private readonly helpersService: HelpersService) {}

  @Post()
  async create(@Body() createHelperDto: CreateHelperDto) {
    return this.helpersService.create(createHelperDto);
  }
}
