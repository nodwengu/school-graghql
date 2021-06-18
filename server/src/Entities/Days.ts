import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Lesson } from './Lesson';

@Entity()
export class Days extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({name: 'day_name'})
    dayName!: string;

    @OneToMany(() => Lesson, (lesson: Lesson) => lesson.day, {onDelete: "CASCADE", onUpdate: 'CASCADE'})
    lessons!: Array<Lesson>;

}