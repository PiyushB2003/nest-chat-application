import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Group } from "./group.entity";


@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    content: string;

    @Column()
    createdAt: Date;

    @ManyToOne(() => User, (user) => user.messages)
    sender: User;

    @ManyToOne(() => User, { nullable: true })
    recipient: User;

    @ManyToOne(() => Group, { nullable: true })
    group: Group;
}