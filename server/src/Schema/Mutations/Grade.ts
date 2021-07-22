import { GraphQLString, GraphQLID } from 'graphql';
import { GradeType } from '../TypeDefs/Grade';
import { MessageType } from '../TypeDefs/Messages';
import { Grade } from '../../Entities/Grade';
import { getRepository } from 'typeorm';

export const CREATE_GRADE = {
   type: GradeType,
   args: { gradeName: { type: GraphQLString } },
   async resolve(parent: any, args: any) {
   
      await getRepository(Grade).createQueryBuilder()
         .insert()
         .into(Grade)
         .values([ {gradeName: args.gradeName} ])
         .execute()

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
      
      await getRepository(Grade).createQueryBuilder()
         .update(Grade)
         .set({gradeName: args.gradeName})
         .where('id = :id', { id: args.id })
         .execute();
      return { successful: true, message: "GRADE SUCCESSFULLY UPDATED" };
   }
}

export const DELETE_GRADE = {
   type: MessageType,
   args: {
      id: {type: GraphQLID}
   },
   async resolve(parent: any, args: any) {
      await getRepository(Grade).createQueryBuilder()
         .delete()
         .from(Grade)
         .where('id = :id', { id: args.id })
         .execute();
         
      return { successful: true, message: "GRADE SUCCESSFULLY DELETED" };
   }
}