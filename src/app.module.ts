import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from '@codingleoo/lol-nest';
import { ConfigModule } from '@nestjs/config';
import { StaticResourcesModule } from '@codingleoo/lol-sci';
import { MongoDbModule } from './mongo/mongodb.module';
import { CacheModule } from './cache/cache.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongoDbModule,
    CacheModule,
    ApiModule,
    StaticResourcesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
