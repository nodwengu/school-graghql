import { GraphQLObjectType, GraphQLID, GraphQLString } from "graphql";

export const SubjectType = new GraphQLObjectType({
    name: 'Subject',
    fields: () => ({
        id: { type: GraphQLID },
        subjectName: { type: GraphQLString }
    })

});