import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: true,
      credentials: true,
      // allowedHeaders: ['Authorization', 'Content-Type'],
      // methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    },
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

  const configService = app.get(ConfigService);
  const config = new DocumentBuilder()

    .setTitle(configService.get('SWAGGER_TITLE') ?? '')
    .setDescription(configService.get('SWAGGER_DESCRIPTION') ?? '')
    .setVersion(configService.get('SWAGGER_VERSION') ?? '')
    .addTag(configService.get('SWAGGER_TAG') ?? '')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Entrer le token JWT ici',
        in: 'header',
      },
      'access-token',
    )
    .build();
  const document = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
