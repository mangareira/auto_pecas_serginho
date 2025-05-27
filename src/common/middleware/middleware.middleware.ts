import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class Middleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const token: string = req.cookies['access_token'];

      if (!token) throw new UnauthorizedException();

      await this.jwtService.verifyAsync(token);

      next();
    } catch (error) {
      const message =
        error === 'TokenExpiredError' ? 'Token expirado' : 'Token inválido';

      throw new UnauthorizedException(message);
    }
  }
}
