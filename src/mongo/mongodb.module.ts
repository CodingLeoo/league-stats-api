import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Connection } from 'mongoose';
import { createConnection } from 'mongoose';
import { MONGODB_URL } from '../util/env.constants';
import { DATABASE_CONNECTION } from '../util/providers';

@Global()
@Module({
  providers: [
    {
      provide: DATABASE_CONNECTION,
      inject: [ConfigService],
      useFactory: (config: ConfigService): Connection => {
        const url = config.get(MONGODB_URL);
        return createConnection(url);
      },
    },
  ],
  exports: [DATABASE_CONNECTION],
})
export class MongoDbModule {}
