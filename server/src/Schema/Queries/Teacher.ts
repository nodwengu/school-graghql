import { GraphQLList, GraphQLID } from 'graphql';
import { getRepository } from 'typeorm';
import { TeacherType } from '../TypeDefs/Teacher';
import { Teacher } from '../../Entities/Teacher';
import { SubjectType } from '../TypeDefs/Subject';

export const GET_ALL_TEACHERS = {
    type: GraphQLList(TeacherType),
    description: "List of all teachers",
    async resolve() {
        const teacherRepository = getRepository(Teacher);
        return await teacherRepository.find();
    }
}

export const GET_TEACHER = {
    type: TeacherType,
    description: "Returns one teacher",
    args: {
        id: { type: GraphQLID }
    },
    async resolve(parent: any, args:any) {
        return await getRepository(Teacher).findOneOrFail(args.id);
    }
}

export const GET_TEACHER_SUBJECTS = {
    type: GraphQLList(SubjectType),
    description: "Returns a list of subjects for teacher",
    args: {
        id: { type: GraphQLID }
    },
    async resolve(parent: any, args:any) {
        
    }
}



// const user = await teacherRepository
        //                 .createQueryBuilder()
        //                 .select("teacher")
        //                 .from(Teacher, "teacher")
        //                 .where("teacher.id = :id", {id: args.id})
        //                 .getOne();
