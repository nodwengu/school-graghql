import { GraphQLList, GraphQLID } from 'graphql';
import { Learner } from '../../Entities/Learner';
import { LearnerType } from '../TypeDefs/Learner';

export const GET_ALL_LEARNERS = {
    type: GraphQLList(LearnerType),
    description: 'List of learners',
    async resolve() {
       return await Learner.find();
    }
}

export const GET_LEARNER = {
    type: LearnerType,
    description: 'Represents a single learner object',
    args: {
        id: { type: GraphQLID }
    },
    async resolve(parent: any, args: any) {
        const { id } = args;
        const learner = await Learner.findOne({ id });
        console.log("THE LEARNER: ", learner);
        
        if (!learner) {
            return new Error("Learner with ID " + id + " does not exist");
        }
        return learner;
    }
}