import { GraphQLString, GraphQLID } from "graphql";
import { SubjectType } from "../TypeDefs/Subject"
import { MessageType } from "../TypeDefs/Messages"
import { Subject } from "../../Entities/Subject";

export const CREATE_SUBJECT = {
    type: SubjectType,
    args: {
      subjectName: { type: GraphQLString }
    },
    async resolve(parent: any, args: any) {
       const { subjectName } = args;
       await Subject.insert({ subjectName: subjectName });
       return args;
    } 

}

export const UPDATE_SUBJECT = {
   type: MessageType,
   args: {
      id: { type: GraphQLID },
      subjectName: { type: GraphQLString }
   },
   async resolve(parent: any, args: any) {
      const { id, subjectName } = args;
      const subject = await Subject.findOne({ id: id });

      if(!subject) {
         throw new Error("Subject with ID: " + id + " does not exists");
      }

      await Subject.update(
         { id: id },
         { subjectName: subjectName }
      );
      return { successful: true, message: "SUBJECT SUCCESSFULLY UPDATED" };
   }
}


export const DELETE_SUBJECT = {
   type: MessageType,
   args: {
      id: { type: GraphQLID }
   },
   async resolve(parent: any, args: any) {
      const { id } = args;
      await Subject.delete({ id: id });
      return { successful: true, message: "SUBJECT SUCCESSFULLY DELETED" };
   }
    
}