// Core
import { Controller, Get, Res, Query } from '@nestjs/common';

// Services
import { DiscordAuthService, GoogleAuthService } from './services';

@Controller('auth')
export class AuthorizationController {
  constructor(
    private readonly googleAuthService: GoogleAuthService,
    private readonly discordAuthService: DiscordAuthService,
  ) {}

  @Get('google')
  async google(@Res() res) {
    const url = this.googleAuthService.getRedirectUrl();
    res.redirect(url);
  }

  @Get('google/callback')
  async googleCallback(@Query() params, @Res() res) {
    const { code } = params;
    const authData = await this.googleAuthService.userDataByCode(code);
    if (!authData) {
      return res.redirect(
        'overwolf-extension://jpofjgdffhginlkgjeckjcpeppdecofdcdfdclnn/failed.html',
      );
    }

    // TODO: Save to DB

    return res.redirect(
      'overwolf-extension://jpofjgdffhginlkgjeckjcpeppdecofdcdfdclnn/success.html',
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
        'overwolf-extension://jpofjgdffhginlkgjeckjcpeppdecofdcdfdclnn/failed.html',
      );
    }

    // TODO: Save to DB

    return res.redirect(
      'overwolf-extension://jpofjgdffhginlkgjeckjcpeppdecofdcdfdclnn/success.html',
    );
  }
}
