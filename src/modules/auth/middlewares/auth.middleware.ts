// Core
import { NestMiddleware, HttpStatus, Injectable } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

// Exceptions
import { HttpException } from '@nestjs/common/exceptions';

// Utils
import * as jwt from 'jsonwebtoken';

// Config
import { jwtConfig } from '../config';

interface IGetUserAuthInfoRequest extends Request {
  user: any;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) {
    const header = req.header('Authorization');
    if (header) {
      const token = header;

      try {
        const decoded = jwt.verify(token, jwtConfig.secret);
        req.user = decoded;
      } catch (e) {
        console.log(e);
        throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED);
      }

      next();
    } else {
      throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED);
    }
  }
}
