import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { IItemsRepository } from './repository/items.repository';

@Injectable()
export class ItemsService {
  constructor(private itemRepository: IItemsRepository) {}

  async create(createItemDto: CreateItemDto) {
    return this.itemRepository.create(createItemDto);
  }

  async findAll() {
    return this.itemRepository.getAll();
  }

  async findOne(id: string) {
    return this.itemRepository.getById(id);
  }

  async update(id: string, updateItemDto: CreateItemDto) {
    return this.itemRepository.update(updateItemDto, id);
  }

  async remove(id: string) {
    await this.itemRepository.deleteById(id);

    return null;
  }

  async deleteBulk(ids: Array<string>) {
    await this.itemRepository.deleteBulk(ids);

    return null;
  }
}
