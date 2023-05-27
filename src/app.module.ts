import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { jwtConfig } from './config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { ENV_FILE_PATH } from './app.constant';
import databaseConfig from './config/database.config';
// import { validateEnvironments } from './env.validation';


@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [databaseConfig, jwtConfig],
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/nest'),
    AuthModule,
    UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {
}
