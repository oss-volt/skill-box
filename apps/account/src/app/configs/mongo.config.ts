import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';

export const getMongoConfig = (): MongooseModuleAsyncOptions => {
  return {
    useFactory: (configService: ConfigService) => ({
      uri: configService.get('MONGO_DB_URI'),
    }),
    inject: [ConfigService],
    imports: [ConfigModule],
  };
};
