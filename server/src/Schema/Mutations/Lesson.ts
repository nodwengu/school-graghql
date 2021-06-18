import { GraphQLString, GraphQLID } from 'graphql';
import { LessonType } from '../TypeDefs/Lesson';
import { Lesson } from '../../Entities/Lesson';
import { MessageType } from '../TypeDefs/Messages';
import { resolve } from 'path';

export const CREATE_LESSON = {
   type: LessonType,
   args: {
      lessonName: { type: GraphQLString },
      subject_id: { type: GraphQLID },
      grade_id: { type: GraphQLID },
      day_id: { type: GraphQLID },
   },
   async resolve(parent: any, args: any) {
      const { lessonName, subject_id, grade_id, day_id } = args;
      await Lesson.insert({ lessonName, subject_id, grade_id, day_id });
      return args;
   }
}

export const UPDATE_LESSON = {
   type: MessageType,
   args: {
      id: { type: GraphQLID },
      lessonName: { type: GraphQLString },
   },
   async resolve(parent: any, args: any) {
      const { id, lessonName } = args;
      const lesson = await Lesson.findOne({ id });

      if (!lesson) {
         throw new Error("Lesson with ID: " + id + " can not be found");
      }
      await Lesson.update({ id: id }, { lessonName: lessonName });
      return { successful: true, message: "LESSON SUCCESSFULLY UPDATED" };
   }
}

export const DELETE_LESSON = {
   type: MessageType,
   args: {
      id: { type: GraphQLID },
   },
   async resolve(parent: any, args: any) {
      const { id } = args;
      await Lesson.delete({ id });
      return { successful: true, message: "LESSON SUCCESSFULLY UPDATED" };
   }
}