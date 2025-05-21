import { CreateHelperDto } from '../dto/create-helper.dto';
import { Helper } from '../entities/helper.entity';

export abstract class IHelpersRepository {
  abstract create(data: CreateHelperDto): Promise<Helper>;
}
