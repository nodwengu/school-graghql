import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql';
import { DaysType } from '../TypeDefs/Days';
import { MessageType } from '../TypeDefs/Messages';
import { Days } from '../../Entities/Days';
import { resolve } from 'path';

export const CREATE_DAY = {
   type: DaysType,
   args: {
      dayName: { type: GraphQLString }
   },
   async resolve(parent: any, args: any) {
      const { dayName } = args;
      await Days.insert({ dayName });
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
      const day = await Days.findOne({ id });

      if (!day) {
         return new Error("Day with ID " + id + " does not exists...");
      } else {
         await Days.update(
            { id: id },
            { dayName: dayName }
         );
         return { successful: true, message: "DAY SUCCESSFULLY UPDATED" };
      }

   }
}

export const DELETE_DAY = {
   type: MessageType,
   args: {
      id: { type: GraphQLID }
   },
   async resolve(parent: any, args: any) {
      const { id } = args;
      await Days.delete(id);
      return { successful: true, message: "DAY SUCCESSFULLY DELETED" };
   }

}