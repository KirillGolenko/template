import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as config from 'config';
import { setup } from '@utils/setup.util';
import { WinstonModule } from 'nest-winston';
import { format, transports } from 'winston';

(async (): Promise<void> => {
  const port = config.get('port') || 3000;
  const { combine, colorize, timestamp, printf } = format;

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: WinstonModule.createLogger({
      format: combine(
        colorize({
          all: true,
          message: true,
          level: true,
        }),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        printf((msg) => {
          return `[${msg.level}] [${msg.timestamp}] - [${msg.context}] ${msg.message}`;
        }),
      ),
      transports: [
        new transports.Console(),
        new transports.File({
          filename: 'error.log',
          level: 'error',
        }),
      ],
    }),
  });

  setup(app, port);

  await app.listen(port);
})();
