import { Body, Controller, Post, Req, Res, UsePipes } from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto, createLoginSchema } from './dto/create-login.dto';
import { ZodPipe } from 'src/common/pipes/zod/zod.pipe';
import { Request, Response } from 'express';

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

    this.makeCookie(res, result);

    res.status(200);

    return result;
  }

  @Post('/refresh-token')
  async refresToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const refresh_token: string = req.signedCookies['refresh_token'];

    const tokens = await this.loginService.refreshToken(refresh_token);

    this.makeCookie(res, tokens);

    return tokens;
  }

  private makeCookie(
    res: Response,
    result: { access_token: string; refresh_token: string },
  ) {
    res
      .cookie('access_token', result.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 3600000,
        path: '/',
      })
      .cookie('refresh_token', result.refresh_token, {
        signed: true,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: '/',
      });
  }
}
