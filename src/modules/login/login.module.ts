import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ILoginRepository } from './repository/login.repository';
import { LoginPrismaRepository } from './repository/prisma/prisma.repository';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [LoginController],
  providers: [
    LoginService,
    PrismaService,
    {
      provide: ILoginRepository,
      useClass: LoginPrismaRepository,
    },
  ],
})
export class LoginModule {}
