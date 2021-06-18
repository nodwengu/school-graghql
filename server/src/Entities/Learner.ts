import {  } from 'graphql';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Grade } from '../Entities/Grade';

@Entity()
export class Learner extends BaseEntity {
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

    @Column({ nullable: true })
    grade_id!: number;

    @ManyToOne(() => Grade, (grade: Grade) => grade.learners)
    @JoinColumn({name: 'grade_id'})
    grade!: Grade;

}