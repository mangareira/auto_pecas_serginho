import { CreateAdminDto } from '../dto/create-admin.dto';
import { Admin } from '../entities/admin.entity';

export abstract class IAdminRepository {
  abstract create(data: CreateAdminDto): Promise<Admin>;
  abstract getAll(): Promise<Admin[]>;
  abstract getById(id: string): Promise<Admin | null>;
  abstract update(data: Admin): Promise<Admin>;
}
