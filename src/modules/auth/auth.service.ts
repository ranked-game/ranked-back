import { Injectable } from '@nestjs/common';

import { google } from 'googleapis';
import { OAuth2Client } from 'googleapis-common';

const googleConfig = {
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirect: process.env.GOOGLE_REDIRECT_URL,
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

  public getGoogleAccountFromCode = async code => {
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
      tokens,
      name: me.data.name.givenName,
      surname: me.data.name.familyName,
    };
  };
}
