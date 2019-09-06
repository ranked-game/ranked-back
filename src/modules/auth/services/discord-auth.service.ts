// Core
import { Injectable } from '@nestjs/common';

// Services
import fetch from 'node-fetch';
const btoa = require('btoa');

@Injectable()
export class DiscordAuthService {
  private readonly clientId: string = process.env.DISCORD_AUTH_ID;
  private readonly clientSecret: string = process.env.DISCORD_AUTH_SECRET;
  private readonly callback: string = process.env.DISCORD_AUTH_CALLBACK;

  public getRedirectUrl() {
    return `https://discordapp.com/oauth2/authorize?client_id=${
      this.clientId
    }&scope=email%20identify&response_type=code&redirect_uri=${this.callback}`;
  }

  public async userDataByCode(code: string) {
    const credits = btoa(`${this.clientId}:${this.clientSecret}`);

    const tokenResponse = await fetch(
      `https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=${
        this.callback
      }`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${credits}`,
        },
      },
    );
    const tokenJson = await tokenResponse.json();

    const accountResponse = await fetch(`http://discordapp.com/api/users/@me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${tokenJson.access_token}`,
      },
    });
    const account = await accountResponse.json();

    return account;
  }
}
