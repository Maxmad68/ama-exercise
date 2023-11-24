import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Add ValidationPipe to ensure requests data are valid
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: false,
      forbidNonWhitelisted: true,
    }),
  );

  // Enable CORS with full access to the frontend
  app.enableCors({
    origin: ['http://localhost:3000'], // TODO: change this to the frontend url
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Setup Swagger
  const config = new DocumentBuilder().setTitle('Recipes Manager').build();
  const document = SwaggerModule.createDocument(app, config);
  // fs.writeFileSync('./api.json', JSON.stringify(document));
  SwaggerModule.setup('/docs', app, document);

  // Start on port 8080 by default, or on the port specified in env variables
  const port = +process.env.PORT || 8080;
  await app.listen(port);
}
bootstrap();
