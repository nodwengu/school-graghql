import { GraphQLList, GraphQLID } from 'graphql';
import { Grade } from '../../Entities/Grade';
import { GradeType } from '../TypeDefs/Grade';
import { getRepository } from 'typeorm';

export const GET_ALL_GRADES = {
   type: new GraphQLList(GradeType),
   description: 'List of grades',
   async resolve() {
      return await getRepository(Grade).createQueryBuilder()
         .select('g.id')
         .addSelect('g.gradeName')
         .from(Grade, 'g')
         .orderBy('g.id')
         .getMany();
   }
}

export const GET_GRADE = {
   type: GradeType,
   args: {
      id: { type: GraphQLID }
   },
   async resolve(parent: any, args: any) {
      const grade = await getRepository(Grade).createQueryBuilder()
         .select('g.id')
         .addSelect('g.gradeName')
         .from(Grade, 'g')
         .where('g.id = :id', { id: args.id })
         .getOne();

      if (!grade) {
         throw new Error(`GRADE WITH ID: ${args.id} DOESN'T EXIST`);
      }
     return grade;
   }
}