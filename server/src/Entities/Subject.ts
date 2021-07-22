import { Column, PrimaryGeneratedColumn, Entity, OneToMany, ManyToMany } from "typeorm";
import { Lesson } from "./Lesson";
import { Learner } from "../Entities/Learner";
import { type } from "os";
import { Teacher } from "./Teacher";


@Entity()
export class Subject {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({name: "subject_name"})
    subjectName!: string;

    // @OneToMany(() => Lesson, (lesson: Lesson) => lesson.subject, {onDelete: "CASCADE", onUpdate: 'CASCADE'})
    // lessons!: Array<Lesson>;

    @ManyToMany(type => Learner, learner => learner.subjects)
    learners!: Learner[];

    // @ManyToMany(type => Teacher, teacher => teacher.subjects)
    // teachers!: Array<Teacher>;
}
