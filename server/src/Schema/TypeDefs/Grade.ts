import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } from 'graphql';
import { Learner } from '../../Entities/Learner';
import { LearnerType } from './Learner';

export const GradeType = new GraphQLObjectType({
    name: "Grade",
    fields: () => ({
        id: { type: GraphQLID },
        gradeName: { type: GraphQLString },
    })
})