const UserModel = require("../models/userModel.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');



exports.login = async function (req, resp) {

    //If already auth
    if (!req.cookies['auth-token']) {

        let login = req.body.login;
        let pass = req.body.pass;
    
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
                resp.cookie("auth-token", token, {httpOnly: true,maxAge: 900000});
                resp.status(200).send({ message: "LOGIN: SUCCESS."})

            } else {
                console.log('Wrong password for user.');
                resp.status(401).send({message: "LOGIN: WRONG PASSWORD."});
            }
        }
        //Login not exist
        else {
            console.log('No such login in DB.');
            resp.status(401).send({message: "LOGIN: WRONG LOGIN."});
        }
    }
    else{
        resp.status(409).send({message: "LOGIN: YOU ALREADY AUTHENTIFICATED. PLEASE LOGOUT."});
    }

};


exports.register = async function (req, resp) {

    let login = req.body.login;

    let res = await UserModel.getUserByLogin(login);

    //If no such login
    if (!res) {

        // пароль пользователя
        var passwordFromUser = req.body.pass;
        // создаем соль
        var salt = bcrypt.genSaltSync(10);
        // шифруем пароль
        var passwordToSave = bcrypt.hashSync(passwordFromUser, salt);

        const user = {
            login: req.body.login,
            pass: passwordToSave,
            salt: salt,
            name: req.body.name,
            surname: req.body.surname,
        }

        let res = await UserModel.addNewUser(user);

        console.log("Success registration.");
        resp.status(200).send({ message: "REG: SUCCESS"});
    }
    //If user with such login exist
    else {
        console.log('User with such login alredy exist.');
        //409 - Этот ответ отсылается, когда запрос конфликтует с текущим состоянием сервера.
        resp.status(409).send({ message: "REG: USER WITH SUCH LOGIN ARE ALREADY EXIST"});
    }

};

exports.logout = async function (req, resp) {
    if (req.cookies['auth-token']) {
        resp.cookie("auth-token", "", { httpOnly: true,maxAge: -10000 });
        resp.status(200).send({ message: "LOGOUT: SUCCESS."})
    } else {
        resp.status(409).send({ message: "LOGOUT: FAIL.YOU ALREADY LOGOUT!"});
    }
};