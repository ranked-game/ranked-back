// Config
import * as dotenv from 'dotenv';
dotenv.config();

// Core
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './modules/app.module';

// Middlewares
import helmet from 'helmet';

// Docs
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const appOptions = { cors: true };
  const app = await NestFactory.create(AppModule, appOptions);

  // Add middlewares
  app.use(helmet());

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.setGlobalPrefix('api');

  // Setup docs
  const options = new DocumentBuilder()
    .setTitle('Ranked Game')
    .setDescription('The Best OW APP')
    .setVersion('0.0.1')
    .setBasePath('api')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document);

  // Run server
  const port = process.env.PORT || 6001;
  await app.listen(port);
}
bootstrap();
