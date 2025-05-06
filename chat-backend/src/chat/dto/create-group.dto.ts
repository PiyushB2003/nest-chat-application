import { IsArray, IsInt, IsString } from "class-validator";


export class CreateGroupDto {
    @IsString()
    name: string;

    @IsArray()
    @IsInt({ each: true})
    memberIds: number[];
}