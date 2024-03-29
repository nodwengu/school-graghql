import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { schema } from './Schema';
import cors from 'cors';
import { createConnection } from  'typeorm';
import { Users } from './Entities/Users';
import { Grade } from './Entities/Grade';
import { Days } from './Entities/Days';
import { Learner } from './Entities/Learner';
import { Subject } from './Entities/Subject';
import { Lesson } from './Entities/Lesson';
import { LearnerSubject } from './Entities/LearnerSubject';
import { Teacher } from './Entities/Teacher'

const main = async () => {

    await createConnection({
        type: "postgres",
        database: "school_graphql",
        username: "thando",
        password: "thando123",
        logging: true,
        synchronize: false,
        entities: [Lesson, Subject, Learner, Grade, Days, LearnerSubject]
        
        // Lesson, Subject, Learner, Grade, Days, LearnerSubject, Teacher
    });

    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use("/graphql", graphqlHTTP({
        schema: schema,
        graphiql: true
    }));

    app.listen(3000, () => {
        console.log(`SERVER RUNNING ON PORT 4001`);
        
    });

}

main().catch( (error) => {
    console.log(error);
});