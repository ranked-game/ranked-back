// Config
import * as dotenv from 'dotenv';
dotenv.config();

// Core
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';

// Middlewares
import * as csurf from 'csurf';
import * as helmet from 'helmet';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Add middlewares
  app.use(cookieParser());
  app.use(helmet());
  app.use(csurf({ cookie: true }));
  app.setGlobalPrefix('api');

  // Run server
  const port = process.env.PORT || 6001;
  await app.listen(port);
}
bootstrap();
