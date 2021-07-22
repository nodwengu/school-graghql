import { GraphQLObjectType, GraphQLID, GraphQLString } from 'graphql';

export const GradeType = new GraphQLObjectType({
    name: "Grade",
    fields: () => ({
        id: { type: GraphQLID },
        gradeName: { type: GraphQLString },
    })
})