import { SubjectType } from "../TypeDefs/Subject"
import { GraphQLList, GraphQLID } from "graphql"
import { resolve } from "path"
import { Subject } from "../../Entities/Subject"


export const GET_ALL_SUBJECTS = {
    type: new GraphQLList(SubjectType),
    async resolve(parent: any, args: any) {
        return await Subject.find();
    }
}

export const GET_SUBJECT = {
    type: SubjectType,
    args: {
        id: { type: GraphQLID }
    },
    async resolve(parent: any, args: any) {
        const { id } = args;
        const subject = await Subject.findOne({ id: id });

        if(!subject) {
            throw new Error("Subject with ID: " + id + " does not exists.");
        }
        return subject;
    }

}