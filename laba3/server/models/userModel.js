const mysql = require("mysql2");

const sql_add_user = "INSERT INTO user (login, pass, salt) VALUES (?,?,?)";
const sql_user_by_login = "SELECT * FROM user WHERE login=? AND pass=?;";

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
        return result[0];
    } catch (e) {
        console.log(e);
        return false;
    }
}

exports.addNewUser = async function (login, hashpass, salt) {
    try {
        const user = {
            login: login,
            pass: hashpass,
            salt: salt
        }
        const result = await connection.query(sql_add_user,  Object.values(user));
        return true;

    } catch (e) {
        return false;
    }
}

