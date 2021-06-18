import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt } from 'graphql';
import { Grade } from '../../Entities/Grade';
import { GradeType } from '../TypeDefs/Grade';
import { Learner } from '../../Entities/Learner';

export const LearnerType = new GraphQLObjectType({
   name: 'Learner',
   fields: () => ({
      id: { type: GraphQLID },
      firstName: { type: GraphQLString },
      lastName: { type: GraphQLString },
      email: { type: GraphQLString },
      tokens: { type: GraphQLInt },
      grade_id: { type: GraphQLID},
      grade: {
         type: GradeType,
         resolve: async (learner: Learner, args: any) => {
            const grade = await Grade.findOne({ id: learner.grade_id });
            return grade;
         }
      }
   })
});