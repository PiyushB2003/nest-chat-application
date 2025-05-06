import { IsBoolean, isBoolean, IsInt, IsOptional, IsString } from "class-validator";


export class SendMessageDto {
    @IsString()
    content: string;
    
    @IsOptional()
    @IsInt()
    recipientId?: number;

    @IsOptional()
    @IsInt()
    groupId?: number;
}