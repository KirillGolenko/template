import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

import { useSwagger } from './swagger.util';
import HttpExceptionFilter from 'src/filters/http-exception.filter';
import { LoggingInterceptor } from './logging.interceprot';

export const setup = async (app: NestExpressApplication, port: string) => {
  const logger = new Logger(setup.name);
  const path = '/api/v1';

  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.setGlobalPrefix(path);
  app.enableCors();
  app.useGlobalInterceptors(new LoggingInterceptor());

  if (process.env.NODE_ENV !== 'production') {
    useSwagger(app, path);
  }

  await app.listen(port);
  logger.log(`App is listening on port: ${port}`);
};
