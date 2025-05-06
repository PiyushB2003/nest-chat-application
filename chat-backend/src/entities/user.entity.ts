import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Message } from "./message.entity";
import { Group } from "./group.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true})
    username: string;

    @Column({ unique: true})
    email: string;

    @Column()
    password: string;

    @Column({ nullable: true})
    profilePicture: string;

    @OneToMany(() => Message, (message) => message.sender)
    messages: Message[];

    @ManyToMany(() => Group, (group) => group.members)
    groups: Group[];

}