// Core
import { Controller, Get, Res, Query, Logger } from '@nestjs/common';

// Services
import { AccountsService } from '../accounts/services/accounts.service';
import {
  DiscordAuthService,
  GoogleAuthService,
  TokensService,
} from './services';
import { RedisStorageService } from './../dbl';

// Utils
import * as queryString from 'query-string';

// Configs
import { authRedirects } from './config';

// Docs
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiUseTags('auth')
@Controller('auth')
export class AuthorizationController {
  private readonly logger = new Logger(AuthorizationController.name);

  constructor(
    private readonly googleAuthService: GoogleAuthService,
    private readonly discordAuthService: DiscordAuthService,
    private readonly accountsService: AccountsService,
    private readonly redisService: RedisStorageService,
    private readonly tokensService: TokensService,
  ) {}

  @Get('google')
  async google(@Res() res) {
    const url = this.googleAuthService.getRedirectUrl();
    res.redirect(url);
  }

  @Get('google/callback')
  async googleCallback(@Query() params, @Res() res) {
    // Get auth data by code
    const { code } = params;
    const authData = await this.googleAuthService.userDataByCode(code);
    if (!authData) {
      return res.redirect(authRedirects.failed);
    }

    // Create new account if not exists
    const { email, avatar } = authData;
    let account = await this.accountsService.findByEmail(email);
    if (!account) {
      account = await this.accountsService.create(authData.email, avatar);
    } else if (account && !account.avatar) {
      await this.accountsService.updateAvatar(account.id, avatar);
    }

    // Generate tokens
    const tokens = this.tokensService.generateTokens(account);
    const tokensQuery = queryString.stringify(tokens);

    // Save to redis session
    this.logger.log(tokens);
    await this.redisService.hset(
      'token',
      account.id,
      JSON.stringify({ date: Date.now(), token: tokens.refresh }),
    );

    return res.redirect(`${authRedirects.success}?${tokensQuery}`);
  }

  @Get('discord')
  async discord(@Res() res) {
    const url = this.discordAuthService.getRedirectUrl();
    res.redirect(url);
  }

  @Get('discord/callback')
  async discordCallback(@Query() params, @Res() res) {
    const { code } = params;
    const authData = await this.discordAuthService.userDataByCode(code);

    if (!authData) {
      return res.redirect(authRedirects.failed);
    }

    // Avatar
    let avatar = null;
    if (authData.avatar) {
      avatar = `https://cdn.discordapp.com/avatars/${authData.id}/${
        authData.avatar
      }`;
    }

    // Create new account if not exists
    const { email } = authData;
    let account = await this.accountsService.findByEmail(email);
    if (!account) {
      account = await this.accountsService.create(authData.email, avatar);
    } else if (account && !account.avatar) {
      await this.accountsService.updateAvatar(account.id, avatar);
    }

    // Generate tokens
    const tokens = this.tokensService.generateTokens(account);
    const tokensQuery = queryString.stringify(tokens);

    // Save to redis session
    this.logger.log(tokens);
    await this.redisService.hset(
      'token',
      account.id,
      JSON.stringify({ date: Date.now(), token: tokens.refresh }),
    );

    return res.redirect(`${authRedirects.success}?${tokensQuery}`);
  }
}
