const UserModel = require("../models/userModel.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');



exports.login = function (socket) {

    socket.on("login", async function (data, callback) {
        console.log("----LOGIN------");
        console.log("Data:");
        console.log(data);

        let login = data.user.login;
        let pass = data.user.pass;
        let token = data.cookie;

        console.log(`TOKEN: ${token}`);

        if (!token) {
            let res = await UserModel.getUserByLogin(login);
            
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
                    callback({
                        statusCode: 200,
                        token: token,
                        message: "LOGIN: SUCCESS."
                    });

                } else {
                    callback({
                        statusCode: 401,
                        message: "LOGIN: WRONG PASSWORD."
                    });
                }

            }
            //Login not exist
            else {
                console.log('LOGIN: No such login in DB.');
                callback({
                    statusCode: 401,
                    message: "LOGIN: WRONG LOGIN."
                });
            }
        }
        else {
            callback({
                statusCode: 401,
                message: "LOGIN: YOU ARE ALREADY LOGINED."
            });
        }
    });
};


exports.register = function (socket) {

    socket.on("register", async function (data, callback) {
        console.log("----REGISTER------");
        console.log("Data:");
        console.log(data);

        let login = data.login;

        let res = await UserModel.getUserByLogin(login);

        //If no such login
        if (!res) {

            var passwordFromUser = data.pass;
            var salt = bcrypt.genSaltSync(10);
            var passwordToSave = bcrypt.hashSync(passwordFromUser, salt);

            const user = {
                login: data.login,
                pass: passwordToSave,
                salt: salt,
                name: data.name,
                surname: data.surname,
            }

            let res = await UserModel.addNewUser(user);

            console.log("Success registration.");
            callback({
                statusCode: 200,
                message: "REG: SUCCESS"
            });
        }

        //If user with such login exist
        else {
            console.log('User with such login alredy exist.');
            //409 - Этот ответ отсылается, когда запрос конфликтует с текущим состоянием сервера.
            callback({
                statusCode: 409,
                message: "REG: USER WITH SUCH LOGIN ARE ALREADY EXIST"
            });
        }

    });

};

