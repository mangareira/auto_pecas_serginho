import { Injectable } from '@nestjs/common';
import { CreateHelperDto } from './dto/create-helper.dto';
import { IHelpersRepository } from './repository/helpers.repository';
import { Helper } from './entities/helper.entity';

@Injectable()
export class HelpersService {
  constructor(private helperRepository: IHelpersRepository) {}

  async create(createHelperDto: CreateHelperDto) {
    const helper = this.helperRepository.create(createHelperDto);

    return helper;
  }

  async getAll() {
    const helpers = this.helperRepository.getAll();

    return helpers;
  }

  async getById(id: string) {
    const helper = this.helperRepository.getById(id);

    return helper;
  }

  async update(data: Omit<Helper, 'services'>, id: string) {
    const helper = this.helperRepository.update(data, id);

    return helper;
  }

  async deleteById(id: string) {
    await this.helperRepository.deleteById(id);

    return;
  }

  async deleteBulk(ids: Array<string>) {
    await this.helperRepository.deleteBulk(ids);

    return null;
  }
}
