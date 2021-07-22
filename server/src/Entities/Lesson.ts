import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany } from "typeorm";
import { Subject } from "./Subject";
import { Grade } from "./Grade";
import { Days } from "./Days";
import { Learner } from './Learner'

@Entity()
export class Lesson {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({name: 'lesson_name'})
    lessonName!: string;

    @Column()
    time!: string;

    @Column({name: 'subject_id'})
    subjectId!: number;

    @Column({name: 'grade_id'})
    gradeId!: number;

    @Column({name: 'day_id'})
    dayId!: number;

    // @ManyToOne(() => Subject, (subject: Subject) => subject.lessons)
    // @JoinColumn({name: 'subject_id'})
    // subject!: Subject;

    // @ManyToOne(() => Grade, (grade: Grade) => grade.lessons)
    // @JoinColumn({name: 'grade_id'})
    // grade!: Grade;

    // @ManyToOne(() => Days, (day: Days) => day.lessons)
    // @JoinColumn({name: 'day_id'})
    // day!: Days;


    @ManyToMany(() => Learner, learner => learner.lessons)
    learners!: Array<Learner>;

}


// ALTER TABLE "lesson" 
// ALTER COLUMN "time" 
// SET DEFAULT '12:00',