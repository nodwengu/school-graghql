import { GraphQLList, GraphQLID } from 'graphql';
import { Days } from '../../Entities/Days';
import { DaysType } from '../TypeDefs/Days';
import { getRepository } from 'typeorm';

export const GET_ALL_DAYS = {
   type: new GraphQLList(DaysType),
   async resolve() { 
      return await getRepository(Days).createQueryBuilder()
         .select('d.id')
         .addSelect('d.dayName')
         .from(Days, 'd')
         .orderBy('d.id')
         .getMany();
   }
}

export const GET_DAY = {
   type: DaysType,
   args: { id: { type: GraphQLID } },
   async resolve(parent: any, args: any) {
      
      const day = await getRepository(Days).createQueryBuilder()
         .select('d.id')
         .addSelect('d.dayName')
         .from(Days, 'd')
         .where('d.id = :id', { id: args.id })
         .getOne();
     
      if (!day) {
         return new Error("Day with ID " + args.id + " does not exist");
      }
      return day;
   }
}