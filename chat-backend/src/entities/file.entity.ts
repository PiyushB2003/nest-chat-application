import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Message } from "./message.entity";


@Entity()
export class File {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string;

    @Column()
    type: string;

    @ManyToMany(() => Message)
    message: Message[];
}