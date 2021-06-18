import { resolve } from "path";

import { GraphQLID, GraphQLString, GraphQLInt, GraphQLNonNull } from 'graphql';
import { Learner } from '../../Entities/Learner';
import { LearnerType } from '../TypeDefs/Learner';
import { MessageType } from "../TypeDefs/Messages";

export const CREATE_LEARNER = {
    type: LearnerType,
    description: 'Creating new learner',
    args: {
        firstName: { type: GraphQLNonNull(GraphQLString) },
        lastName: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        tokens: { type: GraphQLNonNull(GraphQLInt) },
        grade_id: { type: GraphQLNonNull(GraphQLID) },
    },
    async resolve(parent: any, args: any) {
        const { firstName, lastName, email, tokens, grade_id } = args;
        await Learner.insert( args );
        return args;
    },
}

export const UPDATE_LEARNER = {
    type: MessageType,
    args: {
        id: { type: GraphQLID },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        tokens: { type: GraphQLInt },
        grade_id: { type: GraphQLID},
    },
    async resolve(parent: any, args: any) {
        const { id, firstName, lastName, email, tokens, grade_id } = args;
        const learner = await Learner.findOne({ id });

        if (!learner) {
            throw new Error("Learner does not exist!");
        } else {
            await Learner.update(
                { id: id },
                { firstName: firstName },
            );

            return { successful: true, message: "LEARNER SUCCESSFULLY DELETED" };
        }
    }
}

export const DELETE_LEARNER = {
    type: MessageType,
    args: {
        id: { type: GraphQLID }
    },
    async resolve(parent: any, args: any) {
        const { id } = args;
        await Learner.delete({ id });
        return { successful: true, message: "LEARNER SUCCESSFULLY DELETED" };
    }

}