import { BaseEntity, Column, PrimaryGeneratedColumn, Entity, OneToMany } from "typeorm";
import { Lesson } from "./Lesson";

@Entity()
export class Subject extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    subjectName!: string;

    @OneToMany(() => Lesson, (lesson: Lesson) => lesson.subject, {onDelete: "CASCADE", onUpdate: 'CASCADE'})
    lessons!: Array<Lesson>;
}