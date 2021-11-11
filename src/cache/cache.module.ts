import { Global, Logger, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisModule } from 'nestjs-redis';
import { REDIS_URL } from '../util/env.constants';

@Global()
@Module({
  imports: [
    RedisModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          url: configService.get(REDIS_URL),
          onClientReady: (client: any) => {
            const logger = new Logger('Redis');

            client.on('error', (err: any) => {
              logger.error('Redis error: ', err);
            });
          },
        };
      },
    }),
  ],
})
export class CacheModule {}
