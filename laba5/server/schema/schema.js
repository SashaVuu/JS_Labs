
const {buildSchema} = require('graphql');

const schema = buildSchema(
`   
    scalar Upload

    type Task {
        idtask:ID,
        name:String,
        status:String,
        start_date:String,
        finish_date:String,
        executor_surname:String
    }

    type User {
        iduser:ID,
        login:String,
        pass:String,
        salt:String,
        name:String,
        surname:String,
    }


    type Answer {
        status_code:Int,
        message:String,
    }
    
    input TaskAddInput {
        name:String,
        status:String,
        start_date:String,
        finish_date:String,
        executor_surname:String
    }

    input TaskUpdateInput {
        status:String,
        finish_date:String
    }

    type File {
        idfile:ID,
        filename:String,
        originalname:String,
        path:String,
        idowner:ID
    }

    input UserAddInput {
        login:String,
        pass:String,
        name:String,
        surname:String
    }

    input UserLoginInput {
        login:String,
        pass:String
    }



    type Query {
        getAllTasks:[Task]
        getTaskById(idtask:ID):Task
        getTasksByStatus(status:String):[Task]

        getAllFiles(idtask:ID):[File]
        
    }

    type Mutation {
        addTask(input:TaskAddInput):Answer
        updateTask(idtask:ID,input:TaskUpdateInput):Answer
        deleteTask(idtask:ID):Answer

        addUser(input:UserAddInput):Answer
        loginUser(input:UserLoginInput):Answer

        uploadFile(file:Upload, idowner:Int ):Answer
    }

`)

module.exports = schema;