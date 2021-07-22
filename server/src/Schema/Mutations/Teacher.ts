import { GraphQLNonNull, GraphQLString, GraphQLInt, GraphQLID } from 'graphql';
import { getRepository } from 'typeorm';
import { TeacherType } from '../TypeDefs/Teacher'
import { Teacher } from '../../Entities/Teacher';
import { MessageType } from '../TypeDefs/Messages';
import { resolve } from 'path';

export const CREATE_TEACHER = {
    type: TeacherType,
    description: 'Creating new teacher',
    args: {
        firstName: { type: GraphQLNonNull(GraphQLString) },
        lastName: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        tokens: { type: GraphQLNonNull(GraphQLInt) },
    },
    async resolve(parent: any, args: any) {
        const { firstName, lastName, email, tokens } = args;
        const teacherRepositroy = getRepository(Teacher);
        await teacherRepositroy.save({ firstName, lastName, email, tokens });
        return args;
    },
}

export const UPDATE_TEACHER = {
    type: MessageType,
    description: "Updating teacher record",
    args: {
        id: { type: GraphQLID },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        tokens: { type: GraphQLInt },
    },
    async resolve(parent: any, args: any) {
        const teacherRepositroy = getRepository(Teacher);
        let teacher = await teacherRepositroy.findOneOrFail(args.id);
        teacher.firstName = args.firstName;
        teacher.lastName = args.lastName;
        teacher.email = args.email;
        teacher.tokens = args.tokens
        await teacherRepositroy.save(teacher);
        return { successful: true, message: "LEARNER SUCCESSFULLY UPDATED" };
    }
}

export const DELETE_TEACHER = {
    type: MessageType,
    description: "Delete a single teacher",
    args: { id: {type: GraphQLInt} },
    async resolve(parent: any, args: any) {
        const teacherRepositroy = getRepository(Teacher);
        teacherRepositroy.delete(args.id);
        return { successful: true, message: "LEARNER SUCCESSFULLY DELETED" };
    }   
}

export const ADD_TEACHER_SUBJECT = {
    type: MessageType,
    description: "Adding teacher's subjects",
    args: {},
    async resolve() {

    }
}