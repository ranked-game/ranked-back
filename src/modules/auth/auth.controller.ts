import { Controller, Get, Res } from '@nestjs/common';

import { GoogleAuthService } from './auth.service';

@Controller()
export class AuthorizationController {
  constructor(private readonly googleAuthService: GoogleAuthService) {}

  @Get('google')
  async google(@Res() res) {
    const url = this.googleAuthService.getRedirectUrl();
    res.redirect(url);
  }

  @Get('google/callback')
  async googleCallback() {}

  @Get('discord')
  async discord(@Res() res) {
    const url = '';
    res.redirect(url);
  }

  @Get('discord/callback')
  async discordCallback() {}
}
