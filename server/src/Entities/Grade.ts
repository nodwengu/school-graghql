import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Learner } from '../Entities/Learner';
import { Lesson } from './Lesson';

@Entity()
export class Grade extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number
    
    @Column({name: 'grade_name', nullable: false})
    gradeName!: string;

    @OneToMany(() => Learner, (learner: Learner) => learner.grade, {onDelete: "CASCADE", onUpdate: 'CASCADE'})
    learners!: Array<Learner>;

    @OneToMany(() => Lesson, (lesson: Lesson) => lesson.grade, {onDelete: "CASCADE", onUpdate: 'CASCADE'})
    lessons!: Array<Lesson>;
}