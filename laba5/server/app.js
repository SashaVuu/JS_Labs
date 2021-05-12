const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");


const {createWriteStream} = require("fs");
var path = require('path');

const auth = require("./middleware/jwt.js");

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { graphqlUploadExpress} = require('graphql-upload');
const Upload = require('graphql-upload/public/Upload');

const taskModel = require('./models/taskModel');
const userModel = require('./models/userModel');

const {graphqlHTTP} = require('express-graphql');


const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:8081',
    credentials: true
}));


const schema = require('./schema.js');
//const root  = require('./root/root.js');


const root = {

    getAllTasks: async () => {
        let tasks = await taskModel.getAll();
        console.log(tasks);
        return tasks;
    },

    getTasksByStatus: async ({
        status
    }) => {
        console.log(status);
        let tasks = await taskModel.sortTasks(status);
        console.log(tasks);
        return tasks;
    },

    getTaskById: async ({
        idtask
    }) => {
        console.log(idtask);
        let task = await taskModel.getTaskById(idtask);
        let files = await taskModel.getAllFiles(idtask);
        task[0].files = files;
        console.log(task[0]);

        return task[0];
    },
    
    logout: async ({},request) => {
         console.log("REQUEST");
        // console.log(request);
        request.res.cookie("auth-token", "", { httpOnly: true,maxAge: -10000 });
        request.res.statusCode = 200;
        return {
            status_code: 200,
            message: "OK"
        }
    },

    addTask: async ({
        input
    }) => {
        console.log(input);
        let result = await taskModel.addTask(input);
        if (result) {
            return {
                status_code: 200,
                message: "OK"
            }
        } else {
            return {
                status_code: 500,
                message: "Can't add task to a database."
            }
        }
    },

    deleteTask: async ({
        idtask
    }) => {
        console.log(idtask);
        let result = await taskModel.deleteTask(idtask);
        if (result) {
            return {
                status_code: 200,
                message: "OK"
            }
        } else {
            return {
                status_code: 500,
                message: "Can't delete task."
            }
        }
    },

    updateTask: async ({
        idtask,
        input
    }) => {
        console.log(idtask);
        console.log(input);
        let result = await taskModel.updateTask(idtask, input);
        if (result) {
            return {
                status_code: 200,
                message: "OK"
            }
        } else {
            return {
                status_code: 500,
                message: "Can't update task."
            }
        }
    },

    //Files
    getAllFiles: async ({
        idtask
    }) => {
        console.log(idtask);
        let tasks = await taskModel.getAllFiles(idtask);
        return tasks;
    },

    addFile: async ({
        idtask,
        input
    }) => {
        console.log(idtask);
        console.log(input);
        let result = await taskModel.addFile(idtask, input);
        if (result) {
            return {
                status_code: 200,
                message: "OK"
            }
        } else {
            return {
                status_code: 500,
                message: "Can't add file."
            }
        }
    },

    //User
    //Registration
    addUser: async ({
        input
    }, request) => {


        console.log("----REGISTER------");
        console.log("Data:");
        console.log(input);

        let login = input.login;

        let res = await userModel.getUserByLogin(login);

        //If no such login
        if (!res) {
            var passwordFromUser = input.pass;
            var salt = bcrypt.genSaltSync(10);
            var passwordToSave = bcrypt.hashSync(passwordFromUser, salt);

            const user = {
                login: input.login,
                pass: passwordToSave,
                salt: salt,
                name: input.name,
                surname: input.surname,
            }
            let res = await userModel.addNewUser(user);

            console.log("Success registration.");
            request.res.statusCode = 200;
            return {
                status_code: 200,
                message: "REG: SUCCESS"
            }
        } else {
            request.res.statusCode = 409;
            return ({
                status_сode: 409,
                message: "REG: USER WITH SUCH LOGIN ARE ALREADY EXIST"
            });

        }
    },

    //Login
    loginUser: async ({
        input
    }, request, response) => {

        // console.log("REQUEST:");
        // console.log(request);

        // console.log("RESPONSE:");
        // console.log(request.res.statusCode);

        console.log("----LOGIN------");
        console.log("Data:");
        console.log(input);

        let login = input.login;
        let pass = input.pass;

        //!!!
        let token = request.headers.cookie;
        console.log(`TOKEN: ${token}`);

        if (!token) {

            let res = await userModel.getUserByLogin(login);

            //Login exist
            if (res) {
                console.log(res);
                console.log(`salt - ${res.salt}`);

                if (bcrypt.hashSync(pass, res.salt) === res.pass) {

                    console.log('New loggined user.');
                    const id = res.id;
                    const token = jwt.sign({
                        id
                    }, 'jwtSecret');


                    request.res.cookie("auth-token", token, {
                        httpOnly: true,
                        maxAge: 900000
                    });

                    request.res.statusCode = 200;

                    return ({
                        status_сode: 200,
                        message: "LOGIN: SUCCESS."
                    });

                } else {

                    request.res.statusCode = 401;
                    return ({
                        status_сode: 401,
                        message: "LOGIN: WRONG PASSWORD."
                    });
                }

            }
            //Login not exist
            else {
                request.res.statusCode = 401;
                return ({
                    status_сode: 401,
                    message: "LOGIN: WRONG LOGIN."
                });
            }
        } else {

            request.res.statusCode = 401;
            return ({
                status_сode: 401,
                message: "LOGIN: YOU ARE ALREADY LOGINED."
            });
        }
    },

    uploadFile: async ({
        file,
        idowner
    }) => {

        try {
            console.log("IN UPLOAD FILE");
            await file;
            console.log(file.file);
            const createReadStream = file.file.createReadStream;
            const filename = file.file.filename;

            console.log('PATH');
            const fdir = __dirname + "/uploads/" + filename;
            console.log(fdir);

            await new Promise(res =>
                createReadStream()
                .pipe(createWriteStream(fdir))
                .on("close", res)
            );

            const fileobj = {
                filename: filename,
                originalname: filename,
                path: fdir,
            }

            await taskModel.addFile(idowner, fileobj);

            return ({
                status_сode: 200,
                message: "FILE_UPLOAD: OK."
            });

        } catch (e) {
            return ({
                status_сode: 404,
                message: "FILE_UPLOAD: SOME ERRORS WHILE UPLOADING FILE."
            });
        }
    }
}


app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.json());
app.use(express.static(__dirname));
app.use(cookieParser());


//Middleware
app.use(auth.verifyJWT);

app.use(
    '/graphql',
    graphqlUploadExpress({
        maxFileSize: 10000000,
        maxFiles: 10
    }),
    graphqlHTTP({
        graphiql: true,
        schema,
        rootValue: root
    })
);

app.listen(3000);