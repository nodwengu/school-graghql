import {  } from 'graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { Grade } from '../Entities/Grade';
import { Subject } from '../Entities/Subject';
import { Lesson } from './Lesson';


@Entity()
export class Learner {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({name: 'first_name'})
    firstName!: string;

    @Column({name: 'last_name'})
    lastName!: string;

    @Column()
    email!: string;

    @Column()
    tokens!: string;

    @Column({ name: 'grade_id' })
    gradeId!: number;

    @ManyToOne(() => Grade, (grade: Grade) => grade.learners)
    @JoinColumn({name: 'grade_id'})
    grade!: Grade;

    @ManyToMany(type => Subject, subject => subject.learners)
    @JoinTable({name: "learner_subject"})
    subjects!: Subject[];

    @ManyToMany(type => Lesson, lesson => lesson.learners)
    @JoinTable({name: "learner_lesson"})
    lessons!: Array<Lesson>;

}