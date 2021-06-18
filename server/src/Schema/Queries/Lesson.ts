import { GraphQLList, GraphQLID } from "graphql";
import { LessonType } from "../TypeDefs/Lesson";
import { resolve } from "path";
import { Lesson } from "../../Entities/Lesson";


export const GET_ALL_LESSONS = {
    type: GraphQLList(LessonType),
    async resolve(parent:any, args:any){
        return await Lesson.find();
    }
}

export const GET_LESSON = {
    type: LessonType,
    args: {
        id: { type: GraphQLID }
    },
    async resolve(parent:any, args:any) {
        const { id } = args;
        const lesson = await Lesson.findOne({ id });

        if(!lesson) {
            throw new Error("Lesson with ID: " + id + " does not exists");
        }
        return lesson;
    }
}