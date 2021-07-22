import { EntityRepository, Repository, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { Subject } from "./Subject";

@EntityRepository(Teacher)
export class Teacher extends Repository<Teacher> {
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

    // @ManyToMany(() => Subject, subject => subject.teachers)
    // @JoinTable({name: "teacher_subject"})
    // subjects!: Array<Subject>

}