import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Message } from './entities/message.entity';
import { Group } from './entities/group.entity';
import { File } from './entities/file.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST || 'localhost',
      port: 3306,
      username: process.env.DATABASE_USER || 'root',
      password: process.env.DATABASE_PASSWORD || '',
      database: process.env.DATABASE_NAME || 'chatapp',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    ChatModule
  ],
})
export class AppModule {}
