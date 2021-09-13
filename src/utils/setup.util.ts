import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

import { useSwagger } from './swagger.util';

export const setup = (app: NestExpressApplication, port: string) => {
  const logger = new Logger(setup.name);
  const path = '/api/v1';

  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.setGlobalPrefix(path);
  app.enableCors();

  if (process.env.NODE_ENV !== 'production') {
    useSwagger(app, path);
  }

  logger.log(`App is listening on port: ${port}`);
};
