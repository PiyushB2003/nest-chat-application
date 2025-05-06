import { Body, Controller, Get, Param, Post, Request, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { SendMessageDto } from "./dto/send-message.dto";
import { CreateGroupDto } from "./dto/create-group.dto";
import { FileInterceptor } from "@nestjs/platform-express";


@Controller('chat')
export class ChatController {
    constructor(private chatService: ChatService){}

    @UseGuards(JwtAuthGuard)
    @Post('message')
    async sendMessage(@Request() req, @Body() sendMessageDto: SendMessageDto){
        return this.chatService.sendMessage(req.user.userId, sendMessageDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('messages/:recipientId/:groupId')

    async getMessages(@Request() req, @Param('recipientId') recipientId?: number, @Param('groupId') groupId?: number){
        return this.chatService.getMessages(req.user.userId, recipientId, groupId);
    }

    @UseGuards(JwtAuthGuard)
    @Post('group')
    async createGroup(@Body() createGroupDto: CreateGroupDto){
        return this.chatService.createGroup(createGroupDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('groups')
    async getGroups(@Request() req){
        return this.chatService.getGroups(req.user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Post('file')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@Request() req,  @UploadedFile() file: Express.Multer.File){
        const message = await this.chatService.sendMessage(req.user.userId, {content: 'File Upload'} as SendMessageDto)
        return {url: `uploads/${file.filename}`, message};
    }
}
