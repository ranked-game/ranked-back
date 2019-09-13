// Core
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';

// Config
import * as dotenv from 'dotenv';

// Middlewares
import * as csurf from 'csurf';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Add middlewares
  app.use(helmet());
  app.use(csurf());
  app.setGlobalPrefix('api');

  // Run server
  const port = process.env.PORT || 6001;
  await app.listen(port);
}
dotenv.config();
bootstrap();
