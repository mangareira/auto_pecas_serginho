import {
  Controller,
  Post,
  Body,
  UsePipes,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto, createAdminSchema } from './dto/create-admin.dto';
import { ZodPipe } from 'src/common/pipes/zod/zod.pipe';
import { Admin } from './entities/admin.entity';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @UsePipes(new ZodPipe(createAdminSchema))
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Get()
  getAll() {
    return this.adminService.getAll();
  }

  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.adminService.getById(id);
  }

  @Put('/:id')
  update(@Body() admin: Admin, @Param('id') id: string) {
    return this.adminService.update(admin, id);
  }

  @Delete('/:id')
  deleteById(@Param('id') id: string) {
    return this.adminService.deleteById(id);
  }
}
