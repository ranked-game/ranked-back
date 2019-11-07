// Core
import { Injectable } from '@nestjs/common';

// Units
import { google } from 'googleapis';
import { OAuth2Client } from 'googleapis-common';

const googleConfig = {
  clientId: process.env.GOOGLE_AUTH_ID,
  clientSecret: process.env.GOOGLE_AUTH_SECRET,
  redirect: process.env.GOOGLE_AUTH_CALLBACK,
};

const defaultScope = [
  'https://www.googleapis.com/auth/plus.me',
  'https://www.googleapis.com/auth/userinfo.email',
];

@Injectable()
export class GoogleAuthService {
  private createConnection() {
    return new google.auth.OAuth2(
      googleConfig.clientId,
      googleConfig.clientSecret,
      googleConfig.redirect,
    );
  }

  private getConnectionUrl(auth: OAuth2Client) {
    return auth.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      scope: defaultScope,
    });
  }

  private getGooglePlusApi = (auth: OAuth2Client) => {
    return google.plus({ version: 'v1', auth });
  };

  public getRedirectUrl = () => {
    const auth = this.createConnection();
    const url = this.getConnectionUrl(auth);

    return url;
  };

  public userDataByCode = async (code: string) => {
    // Create new google connection
    const auth = this.createConnection();
    const data = await auth.getToken(code);
    const tokens = data.tokens;
    auth.setCredentials(tokens);

    // Get user data
    const plus = this.getGooglePlusApi(auth);
    const me = await plus.people.get({ userId: 'me' });
    const userGoogleId = me.data.id;
    const userGoogleEmail =
      me.data.emails && me.data.emails.length && me.data.emails[0].value;

    return {
      id: userGoogleId,
      email: userGoogleEmail,
      avatar: me.data.image.url,
      tokens,
    };
  };
}
