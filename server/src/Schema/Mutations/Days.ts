import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql';
import { DaysType } from '../TypeDefs/Days';
import { MessageType } from '../TypeDefs/Messages';
import { Days } from '../../Entities/Days';
import { resolve } from 'path';
import { getRepository } from 'typeorm';

export const CREATE_DAY = {
   type: DaysType,
   args: {
      dayName: { type: GraphQLString }
   },
   async resolve(parent: any, args: any) {
      const { dayName } = args;
      await getRepository(Days).createQueryBuilder()
         .insert()
         .into(Days)
         .values([ {dayName} ])
         .execute()

      return args;
   }
}

export const UPDATE_DAY = {
   type: MessageType,
   args: {
      id: { type: GraphQLID },
      dayName: { type: GraphQLString }
   },
   async resolve(parent: any, args: any) {
      const { id, dayName } = args;
      const day = await getRepository(Days).createQueryBuilder()
         .update(Days)
         .set({dayName})
         .where('id = :id', { id: id })
         .execute();

      if (!day) {
         return new Error("Day with ID " + id + " does not exists...");
      } else {
         return { successful: true, message: "DAY SUCCESSFULLY UPDATED" };
      }
   }
}

export const DELETE_DAY = {
   type: MessageType,
   args: { id: { type: GraphQLID } },
   async resolve(parent: any, args: any) {
      await getRepository(Days).createQueryBuilder()
         .delete()
         .from(Days)
         .where('id = :id', { id: args.id })
         .execute();
         
      return { successful: true, message: "DAY SUCCESSFULLY DELETED" };
   }

}