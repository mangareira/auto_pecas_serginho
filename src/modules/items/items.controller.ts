import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto, createItemSchema } from './dto/create-item.dto';
import { ZodPipe } from 'src/common/pipes/zod/zod.pipe';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  @UsePipes(new ZodPipe(createItemSchema))
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemsService.create(createItemDto);
  }

  @Post('/delete-bulk')
  deleteBulk(@Body() ids: Array<string>) {
    return this.itemsService.deleteBulk(ids);
  }

  @Get()
  findAll() {
    return this.itemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemDto: CreateItemDto) {
    return this.itemsService.update(id, updateItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemsService.remove(id);
  }
}
