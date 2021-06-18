import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Users extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column("text")
    name!: string;

    @Column({type: "text", unique: true})
    username!: string;

    @Column()
    password!: string;
}