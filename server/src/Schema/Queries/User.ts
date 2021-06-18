import { GraphQLList, GraphQLID } from 'graphql';
import { UserType } from '../TypeDefs/User';
import { Users } from '../../Entities/Users';

export const GET_ALL_USERS = {
   type: new GraphQLList(UserType),
   resolve(){
      return Users.find()
   }
}

export const GET_USER = {
   type: UserType,
   args: {
      id: { type: GraphQLID },
   },
   async resolve(parent: any, args: any){
      const { id } = args;
      const user = await Users.findOne({ id: id });

      if (!user) {
         throw new Error(`USER WITH ID: ${id} DOESN'T EXIST`);
      }
      return user;
   }
}
