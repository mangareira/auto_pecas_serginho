import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { IAdminRepository } from './repository/admin.repository';
import { hash } from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(private adminRepository: IAdminRepository) {}

  async create(createAdminDto: CreateAdminDto) {
    const admin = this.adminRepository.create({
      ...createAdminDto,
      password: await hash(createAdminDto.password, 10),
    });

    return admin;
  }
}
