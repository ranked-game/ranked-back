// Core
import { Injectable } from '@nestjs/common';

// Utils
import * as jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';

// Config
import { jwtConfig } from '../config';
import { AccountEntity } from 'src/modules/dbl/models';

@Injectable()
export class TokensService {
  public generateTokens(account: AccountEntity) {
    const access = this.generateAuthToken(account);
    const refresh = this.generateRefreshToken();

    return { access, refresh };
  }

  private generateAuthToken(account: AccountEntity) {
    return jwt.sign(
      {
        id: account.id,
        email: account.email,
        exp: Math.floor(Date.now() / 1000) + jwtConfig.accessTokenLifetime,
      },
      jwtConfig.secret,
    );
  }

  private generateRefreshToken() {
    const token = uuid();

    return token;
  }
}
