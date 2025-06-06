import { CreateHelperDto } from '../dto/create-helper.dto';
import { Helper } from '../entities/helper.entity';

export abstract class IHelpersRepository {
  abstract create(data: CreateHelperDto): Promise<Helper>;
  abstract getAll(): Promise<Helper[]>;
  abstract getById(id: string): Promise<Helper | null>;
  abstract update(data: Omit<Helper, 'services'>, id: string): Promise<Helper>;
  abstract deleteById(id: string): Promise<null>;
  abstract deleteBulk(ids: Array<string>): Promise<null>;
}
