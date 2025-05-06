import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";


@Entity()
export class Group{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => User, (user) => user.groups)
    @JoinTable()
    members: User[];
}