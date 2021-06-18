import { GraphQLString, GraphQLID } from 'graphql';
import { GradeType } from '../TypeDefs/Grade';
import { MessageType } from '../TypeDefs/Messages';
import { resolve } from 'path';
import { Grade } from '../../Entities/Grade';

export const CREATE_GRADE = {
   type: GradeType,
   args: {
      gradeName: { type: GraphQLString }
   },
   async resolve(parent: any, args: any) {
      const { gradeName } = args;
      await Grade.insert({ gradeName });
      return args;
   }
}

export const UPDATE_GRADE = {
   type: MessageType,
   args: {
      id: { type: GraphQLID },
      gradeName: { type: GraphQLString }
   },
   async resolve(parent: any, args: any) {
      const { id, gradeName } = args;
      const grade = await Grade.findOne({ id });

      if (!grade) {
         throw new Error("GRADE DOESN'T EXIST");
      } else {
         await Grade.update(
            { id: id },
            { gradeName: gradeName }
         );
         return { successful: true, message: "GRADE SUCCESSFULLY UPDATED" };
      }
   }
}

export const DELETE_GRADE = {
   type: MessageType,
   args: {
      id: {type: GraphQLID}
   },
   async resolve(parent: any, args: any) {
      const { id } = args;
      await Grade.delete({ id:id });
      return { successful: true, message: "GRADE SUCCESSFULLY DELETED" };
   }
}