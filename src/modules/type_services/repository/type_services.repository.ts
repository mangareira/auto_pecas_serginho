import { CreateTypeServicesDto } from '../dto/create_type_services.respository';
import { TypeServices } from '../entities/type_services.entity';

export abstract class ITypeServicesRepository {
  abstract create(data: CreateTypeServicesDto): Promise<TypeServices>;
  abstract getAll(): Promise<TypeServices[]>;
  abstract getById(id: string): Promise<TypeServices | null>;
  abstract update(data: TypeServices, id: string): Promise<TypeServices>;
  abstract deleteById(id: string): Promise<null>;
  abstract deleteBulk(ids: Array<string>): Promise<null>;
}
