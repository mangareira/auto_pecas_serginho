import { Service } from 'src/modules/services/entities/services.entity';

export class Employee {
  id: string;
  name: string;
  phone: string;
  services?: Service[];
  value: number;
}
