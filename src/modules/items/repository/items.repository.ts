import { CreateItemDto } from '../dto/create-item.dto';
import { Item } from '../entities/item.entity';

export abstract class IItemsRepository {
  abstract create(data: CreateItemDto): Promise<Item>;
  abstract getAll(): Promise<Item[]>;
  abstract getById(id: string): Promise<Item | null>;
  abstract update(data: Item, id: string): Promise<Item>;
  abstract deleteById(id: string): Promise<null>;
  abstract deleteBulk(ids: Array<string>): Promise<null>;
}
