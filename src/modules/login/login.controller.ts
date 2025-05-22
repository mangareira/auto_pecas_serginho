import { Body, Controller, Post, Res, UsePipes } from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto, createLoginSchema } from './dto/create-login.dto';
import { ZodPipe } from 'src/common/pipes/zod/zod.pipe';
import { Response } from 'express';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  @UsePipes(new ZodPipe(createLoginSchema))
  async signIn(
    @Body() admin: CreateLoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.loginService.findOne(admin);

    res
      .cookie('access_token', result.access_token, {
        signed: true,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600000,
      })
      .cookie('refresh_token', result.refresh_token, {
        signed: true,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

    return;
  }
}
