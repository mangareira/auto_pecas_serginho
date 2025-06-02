import { HttpException, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { IAdminRepository } from './repository/admin.repository';
import { compare, hash } from 'bcrypt';
import { Admin } from './entities/admin.entity';

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

  async getAll() {
    const admins = this.adminRepository.getAll();

    return admins;
  }

  async getById(id: string) {
    const admins = this.adminRepository.getById(id);

    return admins;
  }

  async update(data: Admin) {
    const { id, password } = data;

    const entityToUpdate = await this.adminRepository.getById(id);

    if (!entityToUpdate) {
      throw new HttpException(`Admin com ID '${id}' não encontrado.`, 400);
    }

    if (data.name !== undefined) {
      entityToUpdate.name = data.name;
    }
    if (data.email !== undefined) {
      entityToUpdate.email = data.email;
    }
    if (
      password &&
      typeof password === 'string' &&
      password.length > 0 &&
      (await compare(password, entityToUpdate.password))
    ) {
      entityToUpdate.password = await hash(password, 10);
    }

    const updatedAdmin = this.adminRepository.update(entityToUpdate);

    return updatedAdmin;
  }
}
