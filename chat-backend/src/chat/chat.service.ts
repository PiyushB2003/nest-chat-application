import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Group } from "src/entities/group.entity";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { SendMessageDto } from "./dto/send-message.dto";
import { CreateGroupDto } from "./dto/create-group.dto";
import { Message } from "src/entities/message.entity";


@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(Message)
        private messageRepository: Repository<Message>,
        @InjectRepository(Group)
        private groupRepository: Repository<Group>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async sendMessage(senderId: number, sendMessageDto: SendMessageDto) {
        const { content, recipientId, groupId,  } = sendMessageDto;
        const message = this.messageRepository.create({
            content,
            createdAt: new Date(),
            sender: { id: senderId } as User,
            recipient: recipientId ? { id: recipientId } as User : null,
            group: groupId ? { id: groupId } as Group : null,
        } as any);
        return this.messageRepository.save(message);
    }

    async getMessages(userId: number, recipientId?: number, groupId?: number) {
        return this.messageRepository.find({
            where: [
                { sender: { id: userId }, recipient: { id: recipientId } },
                { sender: { id: recipientId }, recipient: { id: userId } },
                { group: { id: groupId } },
            ],
            relations: ['sender', 'recipient', 'group'],
            order: { createdAt: 'ASC' },
        });
    }

    async createGroup(createGroupDto: CreateGroupDto) {
        const { name, memberIds } = createGroupDto;
        const members = await this.userRepository.findByIds(memberIds);
        const group = this.groupRepository.create({ name, members });
        return this.groupRepository.save(group);
    }

    async getGroups(userId: number) {
        return this.groupRepository.find({ where: { members: { id: userId } }, relations: ['members'] });
    }
}