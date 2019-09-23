// Core
import { Controller, Get, Res, Query } from '@nestjs/common';

// Services
import { AccountsService } from '../accounts/services/accounts.service';
import { DiscordAuthService, GoogleAuthService } from './services';

@Controller('auth')
export class AuthorizationController {
  constructor(
    private readonly googleAuthService: GoogleAuthService,
    private readonly discordAuthService: DiscordAuthService,
    private readonly accountsService: AccountsService,
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
      return res.redirect(
        'overwolf-extension://gkdpbpcoeckfaoghjgpagdamgijpigddeeennllh/failed.html',
      );
    }

    // Create new account if not exists
    const { email } = authData;
    let account = await this.accountsService.findByEmail(email);
    if (!account) {
      account = await this.accountsService.create(authData.email);
    }

    // TODO: Generate auth tokens

    return res.redirect(
      'overwolf-extension://gkdpbpcoeckfaoghjgpagdamgijpigddeeennllh/success.html',
    );
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
      return res.redirect(
        'overwolf-extension://gkdpbpcoeckfaoghjgpagdamgijpigddeeennllh/failed.html',
      );
    }

    // Create new account if not exists
    const { email } = authData;
    let account = await this.accountsService.findByEmail(email);
    if (!account) {
      account = await this.accountsService.create(authData.email);
    }

    // TODO: Generate auth tokens

    return res.redirect(
      'overwolf-extension://gkdpbpcoeckfaoghjgpagdamgijpigddeeennllh/success.html',
    );
  }
}
