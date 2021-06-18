import { GraphQLList, GraphQLID } from 'graphql';
import { Grade } from '../../Entities/Grade';
import { GradeType } from '../TypeDefs/Grade';
import { resolve } from 'path';

export const GET_ALL_GRADES = {
   type: new GraphQLList(GradeType),
   description: 'List of grades',
   async resolve() {
      return await Grade.find();
   }
}

export const GET_GRADE = {
   type: GradeType,
   args: {
      id: { type: GraphQLID }
   },
   async resolve(parent: any, args: any) {
      const id = args.id;
      const grade = await Grade.findOne({ id: id });

      if (!grade) {
         throw new Error(`GRADE WITH ID: ${id} DOESN'T EXIST`);
      }

      return grade;
   }
}