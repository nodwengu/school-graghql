import { GraphQLObjectType, GraphQLID, GraphQLString } from 'graphql';

export const DaysType = new GraphQLObjectType({
    name: "Days",
    fields: () => ({
        id: { type: GraphQLID },
        dayName: { type: GraphQLString }
    })
});