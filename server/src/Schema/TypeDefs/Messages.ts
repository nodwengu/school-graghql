import { GraphQLObjectType, GraphQLBoolean, GraphQLString } from 'graphql';

export const MessageType = new GraphQLObjectType({
   name: "Message",
   fields: () => ({
      successful: { type: GraphQLBoolean },
      message: { type: GraphQLString },
   })
});