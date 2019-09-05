// Core
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';

// Middlewares
import * as csurf from 'csurf';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Add middlewares
  app.use(helmet());
  app.use(csurf());

  // Run server
  const port = process.env.PORT || 6001;
  await app.listen(port);
}
bootstrap();
