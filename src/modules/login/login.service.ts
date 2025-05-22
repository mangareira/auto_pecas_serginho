import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ILoginRepository } from './repository/login.repository';
import { CreateLoginDto } from './dto/create-login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService {
  constructor(
    private loginRepository: ILoginRepository,
    private jwtService: JwtService,
  ) {}

  async findOne(admin: CreateLoginDto) {
    const isExists = await this.loginRepository.signIn(admin);

    if (!isExists) throw new UnauthorizedException();

    const access_token = await this.jwtService.signAsync({ sub: isExists.id });
    const refresh_token = await this.jwtService.signAsync(
      { sub: isExists.id },
      { expiresIn: '7d' },
    );

    return {
      access_token,
      refresh_token,
    };
  }
}
