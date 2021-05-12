const mysql = require("mysql2");

const sql_add_user = "INSERT INTO user (login, pass, salt, name, surname) VALUES (?,?,?,?,?)";
const sql_user_by_login = "SELECT * FROM user WHERE login=?";

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "tasks_db",
    password: "Root1234"
}).promise();

////////////////
exports.getUserByLogin = async function (login) {
    try {
        const result = await connection.query(sql_user_by_login, login);
        return result[0][0];
    } catch (e) {
        console.log(e);
        return false;
    }
}

exports.addNewUser = async function (_user) {
    try {
        const user = {
            login: _user.login,
            pass: _user.pass,
            salt: _user.salt,
            name:_user.name,
            surname:_user.surname
        }
        const result = await connection.query(sql_add_user,  Object.values(user));
        return true;

    } catch (e) {
        return false;
    }
}

