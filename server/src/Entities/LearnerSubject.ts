import { EntityRepository, Repository, Column, PrimaryGeneratedColumn, Entity, OneToMany, ManyToMany, JoinTable, PrimaryColumn, OneToOne, JoinColumn } from "typeorm";
import { Lesson } from "./Lesson";
import { Learner } from "./Learner";
import {} from './Subject'
import { Subject } from "./Subject";

@Entity()
export class LearnerSubject  {
    @PrimaryGeneratedColumn()
    id!: number

    @PrimaryColumn('int') 
    learnerId!: number;

    @PrimaryColumn('int') 
    subjectId!: number;

    @OneToOne(() => Learner)
    @JoinColumn()
    learner!: Learner;

    @OneToOne(() => Subject)
    @JoinColumn()
    subject!: Subject;

}