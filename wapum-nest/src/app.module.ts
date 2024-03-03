import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppGateway } from './app.gateway';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { MailerModule } from './mailer/mailer.module';
import { SocketModule } from './socket/socket.module';
import { UsersModule } from './users/users.module';
import { FileModule } from './file/file.module';
import { AdsModule } from './ads/ads.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MailerModule,
    ChatModule,
    SocketModule,
    FileModule,
    AdsModule,
  ],
  controllers: [],
  providers: [AppService, AppGateway],
})
export class AppModule {}
