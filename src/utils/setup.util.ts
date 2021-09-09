import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger, ValidationPipe } from '@nestjs/common';

import { useSwagger } from './swagger.util';

export const setup = (app: NestExpressApplication, port: string) => {
  const logger = new Logger(setup.name);

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();
  if (process.env.NODE_ENV !== 'production') {
    useSwagger(app);
  }

  logger.log(`App is listening on port: ${port}`);
};
