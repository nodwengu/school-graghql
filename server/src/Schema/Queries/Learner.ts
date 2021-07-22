import { GraphQLList, GraphQLID } from 'graphql';
import { Learner } from '../../Entities/Learner';
import { LearnerType } from '../TypeDefs/Learner';
import { SubjectType } from '../TypeDefs/Subject'
import { resolve } from 'path';
import { getRepository } from 'typeorm';
import { Subject } from '../../Entities/Subject';
import { Lesson } from '../../Entities/Lesson';

export const GET_ALL_LEARNERS = {
   type: GraphQLList(LearnerType),
   description: 'List of learners',
   async resolve() {

      return await getRepository(Learner).createQueryBuilder()
         .select("l.firstName")
         .addSelect("l.id")
         .addSelect("l.lastName")
         .addSelect("l.email")
         .addSelect("l.tokens")
         .addSelect("l.gradeId")
         .from(Learner, 'l')
         .orderBy("l.id")
         .getMany();
   }
}

export const GET_LEARNER = {
   type: LearnerType,
   description: 'Represents a single learner object',
   args: {
      id: { type: GraphQLID }
   },
   async resolve(parent: any, args: any) {
      const learner =  await getRepository(Learner).createQueryBuilder('l')
         .select([ "l.id", "l.firstName", "l.lastName", "l.email", "l.tokens", "l.gradeId" ])
         .where("l.id = :id", { id: args.id })
         .orderBy("l.id")
         .getOne();

      if (!learner) {
         throw new Error("Learner with ID: " + args.id + " does not exists.");
      }
      return learner;
   }
}

export const GET_LEARNER_SUBJECTS = {
   type: GraphQLList(SubjectType),
   description: "Getting all subject for the student",
   args: { id: { type: GraphQLID } },
   async resolve(parent: any, args: any) {

      const data =  await getRepository(Subject).createQueryBuilder('s')
         .select(['s.id', 's.subjectName'])
         .addSelect('l.firstName')
         .innerJoin('learner_subject', 'ls', 's.id = ls.subjectId')
         .innerJoin('learner', 'l', 'l.id = ls.learnerId')
         .where('l.id = ' + args.id)
         .getMany();

console.log("DATA ", data);

         return data;
   }
}


export const GET_LEARNER_LESSONS = {
   type: GraphQLList(LearnerType),
   description: "Return a list of lessons for a particular learner",
   args: { id: { type: GraphQLID } },
   async resolve(parent: any, args: any) {

   //   return await getRepository(Lesson).createQueryBuilder('lesson')
   //       .select('lesson.lessonName')
   //       .addSelect('s.subjectName')
   //       .addSelect('lesson.time')
   //       .addSelect('ls.subjectId')
   //       .addSelect('l.id')
   //       .innerJoin('subject', 's', 'lesson.subject_id = s.id')
   //       .innerJoin('learner_subject', 'ls', 'lesson.subject_id = ls.subjectId')
   //       .innerJoin('learner', 'l', 'l.id = ls.learnerId')
   //       .where('l.id = ' + args.id)
   //       .getRawMany();
   }
}

