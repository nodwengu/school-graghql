import { GraphQLString, GraphQLID } from 'graphql';
import { LessonType } from '../TypeDefs/Lesson';
import { Lesson } from '../../Entities/Lesson';
import { MessageType } from '../TypeDefs/Messages';
import { resolve } from 'path';
import { getRepository } from 'typeorm';

export const CREATE_LESSON = {
   type: LessonType,
   args: {
      lessonName: { type: GraphQLString },
      subjectId: { type: GraphQLID },
      gradeId: { type: GraphQLID },
      dayId: { type: GraphQLID },
      time: { type: GraphQLString }
   },
   async resolve(parent: any, args: any) {
      const { lessonName, subjectId, gradeId, dayId, time } = args;
      await getRepository(Lesson).createQueryBuilder()
         .insert()
         .into(Lesson)
         .values([{ lessonName, subjectId, gradeId, dayId, time }])
         .execute();

      return args;
   }
}

export const UPDATE_LESSON = {
   type: MessageType,
   args: {
      id: { type: GraphQLID },
      lessonName: { type: GraphQLString },
      time: { type: GraphQLString }
   },
   async resolve(parent: any, args: any) {
      const { id, lessonName, time } = args;
      
      const lesson = await getRepository(Lesson).createQueryBuilder()
         .update(Lesson)
         .set({ lessonName, time })
         .where('id = :id', { id: id })
         .execute();
         console.log('ID ID ID ', id);
         

      // if (!id) 
      //    throw new Error("Lesson with ID: " + id + " can not be found");
      // else
      return { successful: true, message: "LESSON SUCCESSFULLY UPDATED" };
   }
}

export const DELETE_LESSON = {
   type: MessageType,
   args: {
      id: { type: GraphQLID },
   },
   async resolve(parent: any, args: any) {
      await getRepository(Lesson).createQueryBuilder()
         .delete()
         .from(Lesson)
         .where('id = :id', { id: args.id })
         .execute();

      return { successful: true, message: "LESSON SUCCESSFULLY DELETED" };
   }
}