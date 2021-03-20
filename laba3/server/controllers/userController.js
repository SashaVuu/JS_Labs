const UserModel = require("../models/userModel.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.login = async function (req, resp) {

    console.log(req.body);

    let login = req.body.login;
    let pass = req.body.pass;

    let res = await UserModel.getUserByLogin(login);

    console.log(`salt - ${res.salt}`);

    if (bcrypt.hashSync(pass, res.salt) === res.password){
        resp.status(200).send("AUTH OK");
    }
    else{
        resp.status(200).send("AUTH NO");
    }

};


exports.register = async function (req, resp) {
    console.log(req.body);

    let login = req.body.login;

    // пароль пользователя
    var passwordFromUser = req.body.pass;
    // создаем соль
    var salt = bcrypt.genSaltSync(10);
    // шифруем пароль
    var passwordToSave = bcrypt.hashSync(passwordFromUser, salt);

    // выводим результат
    console.log(salt);
    console.log(passwordFromUser);
    console.log(passwordToSave);

    let res = await UserModel.addNewUser(login, passwordToSave, salt);

    resp.status(200).send("OK");
};