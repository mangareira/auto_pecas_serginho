import { CreateServiceDto } from '../dto/create-service.dto';
import { Service } from '../entities/services.entity';

export abstract class IServicesRepository {
  abstract create(data: CreateServiceDto): Promise<Service>;
  abstract getAll(): Promise<Service[]>;
  abstract getById(id: string): Promise<Service | null>;
  abstract update(data: CreateServiceDto, id: string): Promise<Service>;
  abstract deleteById(id: string): Promise<null>;
  abstract deleteBulk(ids: Array<string>): Promise<null>;
}
