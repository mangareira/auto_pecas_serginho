import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto, createAdminSchema } from './dto/create-admin.dto';
import { ZodPipe } from 'src/common/pipes/zod/zod.pipe';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @UsePipes(new ZodPipe(createAdminSchema))
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }
}
