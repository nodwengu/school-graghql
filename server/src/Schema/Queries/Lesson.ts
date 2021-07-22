import { GraphQLList, GraphQLID, GraphQLString } from "graphql";
import { LessonType } from "../TypeDefs/Lesson";
import { resolve } from "path";
import { Lesson } from "../../Entities/Lesson";
import { getRepository } from "typeorm";


export const GET_ALL_LESSONS = {
   type: GraphQLList(LessonType),
   async resolve() {
      return await getRepository(Lesson).createQueryBuilder('l')
         .select(['l.id', 'l.lessonName', 'l.time', 'l.subjectId', 'l.gradeId', 'l.dayId'])
         .orderBy('l.id')
         .getMany();
   }
}

export const GET_LESSON = {
   type: LessonType,
   args: { id: { type: GraphQLID } },
   async resolve(parent: any, args: any) {
      const lesson =  await getRepository(Lesson).createQueryBuilder('l')
         .select(['l.id', 'l.lessonName', 'l.time', 'l.subjectId', 'l.gradeId', 'l.dayId'])
         .where('id = :id', { id: args.id })
         .getOne();

      if (!lesson) {
         throw new Error("Lesson with ID: " + args.id + " does not exists");
      }
      return lesson;
   }
}

// export const GET_LEARNER_LESSONS = {
//    type: GraphQLList(LessonType),
//    description: "Return a list of lessons for a particular learner",
//    args: {
//       lessonName: { type: GraphQLString },
//       subject_id: { type: GraphQLID },
//       grade_id: { type: GraphQLID },
//    },
//    async resolve(lesson: Lesson, args: any) {
//       const { lessonName, subjectId, gardeId } = args;
//       const lessonRepository = getRepository(Lesson);

//       const lessons = await lessonRepository.createQueryBuilder('lesson')
//                         .select('lesson.lessonName')
//                         .addSelect('s.subjectName')
//                         .addSelect('lesson.time')
//                         .addSelect('ls.subjectId')
//                         .addSelect('l.id')
//                         .innerJoin('subject', 's', 'lesson.subject_id = s.id') 
//                         .innerJoin('learner_subject', 'ls', 'lesson.subject_id = ls.subjectId') 
//                         .innerJoin('learner', 'l', 'l.id = ls.learnerId') 
//                         .where('l.id = ' + 13) 
//                         .getRawMany();

//       console.log("HOW " ,lessons);

//       return lessons;
      
//    }
//}