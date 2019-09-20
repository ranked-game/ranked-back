// Core
import { Injectable } from '@nestjs/common';

// Utils
import * as jwt from 'jsonwebtoken';
import * as randToken from 'rand-token';

// Config
import { jwtConfig } from '../config';
import { AccountEntity } from 'src/modules/dbl/models';

@Injectable()
export class TokensService {
  constructor() {}

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
        exp: jwtConfig.accessTokenLifetime,
      },
      jwtConfig.secret,
    );
  }

  private generateRefreshToken() {
    const token = randToken.generate();

    return token;
  }
}
