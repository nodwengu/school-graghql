import { GraphQLList, GraphQLID } from 'graphql';
import { Days } from '../../Entities/Days';
import { DaysType } from '../TypeDefs/Days';

export const GET_ALL_DAYS = {
   type: new GraphQLList(DaysType),
   async resolve() { 
      return await Days.find();
   }
}

export const GET_DAY = {
   type: DaysType,
   args: {
      id: { type: GraphQLID }
   },
   async resolve(parent: any, args: any) {
      const { id } = args;
      const day = await Days.findOne({ id });
      if (!day) {
         return new Error("Day with ID " + id + " does not exist");
      }
      return day;
   }
}