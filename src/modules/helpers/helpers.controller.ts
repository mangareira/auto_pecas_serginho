import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { HelpersService } from './helpers.service';
import { CreateHelperDto } from './dto/create-helper.dto';
import { Helper } from './entities/helper.entity';

@Controller('helpers')
export class HelpersController {
  constructor(private readonly helpersService: HelpersService) {}

  @Post()
  async create(@Body() createHelperDto: CreateHelperDto) {
    return this.helpersService.create(createHelperDto);
  }

  @Post('/bulk-delete')
  bulkDelete(@Body() ids: Array<string>) {
    return this.helpersService.deleteBulk(ids);
  }

  @Get()
  getAll() {
    return this.helpersService.getAll();
  }

  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.helpersService.getById(id);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() employee: Omit<Helper, 'services'>) {
    return this.helpersService.update(employee, id);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.helpersService.deleteById(id);
  }
}
