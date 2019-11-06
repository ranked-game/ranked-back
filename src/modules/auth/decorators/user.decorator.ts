// Core
import {
  createParamDecorator,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

export const User = createParamDecorator((data, req) => {
  // if route is protected, there is a user set in auth.middleware
  if (req.user) {
    return data ? req.user[data] : req.user;
  }

  throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED);
});
