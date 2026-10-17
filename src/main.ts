import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip properties that do not have decorators in the DTO
      forbidNonWhitelisted: true, // Throw an error if unknown/extra fields are sent
      transform: true, // Automatically transform payload types (e.g., string to number)
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();