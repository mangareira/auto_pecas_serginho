import { Injectable } from '@nestjs/common';
import { CreateHelperDto } from './dto/create-helper.dto';
import { IHelpersRepository } from './repository/helpers.repository';

@Injectable()
export class HelpersService {
  constructor(private helperRepository: IHelpersRepository) {}

  async create(createHelperDto: CreateHelperDto) {
    const helper = this.helperRepository.create(createHelperDto);

    return helper;
  }
}
