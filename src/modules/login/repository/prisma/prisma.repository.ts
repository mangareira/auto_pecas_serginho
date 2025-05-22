import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLoginDto } from '../../dto/create-login.dto';
import { Login } from '../../entities/login.entity';
import { ILoginRepository } from '../login.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LoginPrismaRepository implements ILoginRepository {
  constructor(private prisma: PrismaService) {}

  async signIn(user: CreateLoginDto): Promise<Login | null> {
    const admin = await this.prisma.admin.findUnique({
      where: {
        email: user.email,
      },
    });

    return admin;
  }
}
