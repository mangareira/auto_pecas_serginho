import { CreateServiceDto } from '../dto/create-service.dto';
import { Service } from '../entities/services.entity';

export abstract class IServicesRepository {
  abstract create(data: CreateServiceDto): Promise<Service>;
}
