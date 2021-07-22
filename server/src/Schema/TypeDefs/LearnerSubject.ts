import { GraphQLObjectType, GraphQLID } from 'graphql';
import { type } from 'os';
import { LearnerType } from './Learner';
import { SubjectType } from './Subject';

export const LearnerSubjectType =  new GraphQLObjectType({
    name: 'LearnerSubject',
    fields: () => ({
        id: { type: GraphQLID },
        learnerId: { type: GraphQLID },
        subjectId: { type: GraphQLID },
        // learner: {
        //     type: LearnerType
        // },
        // subject: {
        //     type: SubjectType
        // }
    })
});