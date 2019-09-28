// Config
import * as dotenv from 'dotenv';
dotenv.config();

// Core
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './modules/app.module';

// Middlewares
import csurf from 'csurf';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const appOptions = { cors: true };
  const app = await NestFactory.create(AppModule, appOptions);

  // Add middlewares
  app.use(cookieParser());
  app.use(helmet());
  // app.use(csurf({ cookie: true }));

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');

  // Run server
  const port = process.env.PORT || 6001;
  await app.listen(port);
}
bootstrap();
