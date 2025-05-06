// import {
//   WebSocketGateway,
//   SubscribeMessage,
//   MessageBody,
//   OnGatewayConnection,
//   OnGatewayDisconnect,
//   WebSocketServer,
// } from '@nestjs/websockets';
// import { Server, Socket } from 'socket.io';

// @WebSocketGateway({
//   cors: {
//     origin: '*',
//   },
// })
// export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
//   @WebSocketServer()
//   server: Server;

//   handleConnection(client: Socket) {
//     console.log(`Client connected: ${client.id}`);
//     this.server.emit('message', `User ${client.id} joined the chat`);
//   }

//   handleDisconnect(client: Socket) {
//     console.log(`Client disconnected: ${client.id}`);
//     this.server.emit('message', `User ${client.id} left the chat`);
//   }

//   @SubscribeMessage('message')
//   handleMessage(@MessageBody() message: string): void {
//     console.log('Received:', message);
//     this.server.emit('message', message); 
//   }
// }


import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { SendMessageDto } from './dto/send-message.dto';

@WebSocketGateway({ cors: true })
export class ChatGateway {
  constructor(private chatService: ChatService) {}

  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody() data: { senderId: number; sendMessageDto: SendMessageDto },
    @ConnectedSocket() client: Socket,
  ) {
    const message = await this.chatService.sendMessage(data.senderId, data.sendMessageDto);
    client.broadcast.emit('message', message);
    return message;
  }
}