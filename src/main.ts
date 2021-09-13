import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

import { setup } from '@utils/setup.util';
dotenv.config();

(async () => {
  const port = process.env.PORT || '3000';

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  setup(app, port);

  await app.listen(3000);
})();
