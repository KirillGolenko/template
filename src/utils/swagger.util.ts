import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const useSwagger = (app: NestExpressApplication) => {
  const path = '/docs';

  const options = new DocumentBuilder()
    .setTitle('Cats api')
    .setDescription('API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(path, app, document);
};
