import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Subject } from "./Subject";
import { Grade } from "./Grade";
import { Days } from "./Days";

@Entity()
export class Lesson extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    lessonName!: string;

    @Column()
    subject_id!: number;

    @ManyToOne(() => Subject, (subject: Subject) => subject.lessons)
    @JoinColumn({name: 'subject_id'})
    subject!: Subject;

    @Column()
    grade_id!: number;

    @ManyToOne(() => Grade, (grade: Grade) => grade.lessons)
    @JoinColumn({name: 'grade_id'})
    grade!: Grade;

    @Column()
    day_id!: number;

    @ManyToOne(() => Days, (day: Days) => day.lessons)
    @JoinColumn({name: 'day_id'})
    day!: Days;
}