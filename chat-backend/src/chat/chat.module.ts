import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Group } from 'src/entities/group.entity';
import { File } from 'src/entities/file.entity';
import { Message } from 'src/entities/message.entity';
import { AuthModule } from 'src/auth/auth.module';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Message, Group, File]),
    AuthModule
  ],
  controllers: [ChatController],
  providers: [ChatService, ChatGateway],
})
export class ChatModule {}
