import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } from "graphql";
import { LessonType } from "../TypeDefs/Lesson";
import { Subject } from "../../Entities/Subject";

export const SubjectType = new GraphQLObjectType({
    name: 'Subject',
    fields: () => ({
        id: { type: GraphQLID },
        subjectName: { type: GraphQLString },
    })

});