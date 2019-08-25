// Core
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Middlewares
import * as csurf from 'csurf';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Add middlewares
  app.use(helmet());
  app.use(csurf());

  await app.listen(3000);
}
bootstrap();
