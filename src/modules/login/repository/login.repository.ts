import { CreateLoginDto } from '../dto/create-login.dto';
import { Login } from '../entities/login.entity';

export abstract class ILoginRepository {
  abstract signIn(user: CreateLoginDto): Promise<Login | null>;
}
