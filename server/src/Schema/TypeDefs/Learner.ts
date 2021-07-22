import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLList } from 'graphql';
import { Grade } from '../../Entities/Grade';
import { GradeType } from '../TypeDefs/Grade';
import { Learner } from '../../Entities/Learner';
import { SubjectType } from './Subject';
import { getRepository } from 'typeorm';
import { Subject } from '../../Entities/Subject';
import { Lesson } from '../../Entities/Lesson';
import { LessonType } from '../TypeDefs/Lesson';
import { resolve } from 'path';

export const LearnerType = new GraphQLObjectType({
   name: 'Learner',
   fields: () => ({
      id: { type: GraphQLID },
      firstName: { type: GraphQLString },
      lastName: { type: GraphQLString },
      email: { type: GraphQLString },
      tokens: { type: GraphQLInt },
      gradeId: { type: GraphQLID },
      grade: {
         type: GradeType,
         resolve: async (learner: Learner, args: any) => {
            return await getRepository(Grade)
            .createQueryBuilder("grade")
            .where("grade.id = :id", {id: learner.gradeId})
            .getOne();
         }
      },
      subjects: {
         type: GraphQLList(SubjectType),
         args: { id: { type: GraphQLID } },
         async resolve(learner: Learner, args: any) {
            const subjects = await getRepository(Subject).createQueryBuilder("s")
               .innerJoin('learner_subject', 'ls', 's.id = ls.subjectId')
               .innerJoin('learner', 'l', 'l.id = ls.learnerId')
               .where('l.id = ' + learner.id) 
               .getMany();
            return subjects;
         }
      },
      lessons: {
         type: GraphQLList(LessonType),
         async resolve(learner: Learner, args: any) {
            return await getRepository(Lesson).createQueryBuilder('l')
               .select(['l.id', 'l.lessonName', 'l.time'])
               .addSelect('s.subjectName')
               .innerJoin('subject', 's', 's.id = l.subjectId')
               .innerJoin('learner_subject', 'ls', 'l.subjectId = ls.subjectId')
               .innerJoin('learner', 'ln', 'ln.id = ls.learnerId')
               .where("ln.id = " + learner.id ) 
               .getMany()
         }
      }

   })
});

/**
 * Define relationship between learner and lesson
 * A Learner can attend one or many Lessons in a given day
 * A Lesson can be attended by many Learners
 *
 * 
 */