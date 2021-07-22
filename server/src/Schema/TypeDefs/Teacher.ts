import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt } from 'graphql';
import { Teacher } from '../../Entities/Teacher';

export const TeacherType = new GraphQLObjectType({
    name: "Teacher",
    fields: () => ({
        id: { type: GraphQLID },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        tokens: { type: GraphQLInt },
        
    })
})