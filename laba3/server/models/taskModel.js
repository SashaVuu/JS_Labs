const mysql = require("mysql2");


const sql_all = "SELECT * FROM task";
const sql_by_status = "SELECT * FROM task WHERE status = ?";
const sql_by_id = "SELECT * FROM task WHERE idtask = ?";
const sql_update_task = "UPDATE task SET status=?, finish_date = ? WHERE idtask = ? "
const sql_insert_new = "INSERT INTO task (name, status, executor_surname, start_date, finish_date) VALUES (?,?,?,?,?)";
const sql_insert_new_file = "INSERT file(filename, originalname, path, idowner) VALUES (?, ?, ?, ?)";
const sql_all_files = "SELECT * FROM file WHERE idowner=?";
const sql_delete_task = "DELETE FROM task WHERE idtask=?";

const sql_add_user = "INSERT INTO user (login, pass, salt) VALUES (?,?,?)";
const sql_user_by_login = "SELECT * FROM user WHERE iduser=?";


const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "tasks_db",
    password: "Root1234"
}).promise();



exports.getAll = async function () {
    try {
        const result = await connection.query(sql_all);
        return editSqlData(result[0]);
    } catch (e) {
        console.log(err);
        return false;
    }
}

exports.sortTasks = async function (status) {
    try {
        const result = await connection.query(sql_by_status, status);
        return editSqlData(result[0]);

    } catch (e) {
        console.log(err);
        return false;
    }
}

exports.getTaskById = async function (id) {

    try {
        const result = await connection.query(sql_by_id, id);
        return editSqlData(result[0]);

    } catch (e) {
        console.log(err);
        return false;
    }
}


exports.insertNewFile = async function (id, filedata) {

    try {
        const file = {
            filename: filedata.filename,
            originalname: filedata.originalname,
            path: filedata.path,
            idowner: id
        }   

        await connection.query(sql_insert_new_file, Object.values(file));
        return true;

    } catch (e) {
        return false;
    }
};


exports.updateTask = async function (taskobj) {

    try {
        const toupdate = [taskobj.status, taskobj.finish_date, taskobj.idtask];
        await connection.query(sql_update_task, toupdate);
        return true;
    } catch (error) {
        return false;
    }

}

exports.addTask = async function (taskobj) {

    try {
        await connection.query(sql_insert_new, Object.values(taskobj));
        return true;
    } catch (e) {
        return false;
    }

}

exports.deleteTask = async function (id) {
    try {
        await connection.query(sql_delete_task, id);
        return true;
    } catch (error) {
        return false;
    }
}

exports.getAllFiles = async function (id) {
    try {
        const result = await connection.query(sql_all_files, id);
        return result[0];
    } catch (e) {
        console.log(err);
        return false;
    }
}



exports.editDate = function (date) {
    return sqlDateTypeTransform(date);
}


function editSqlData(data) {
    data.forEach(element => {
        element.start_date = sqlDateTypeTransform(element.start_date);
        element.finish_date = sqlDateTypeTransform(element.finish_date);
    });
    return data;
}


//From: Wed Sep 16 2020 00:00:00 GMT+0300 (Москва, стандартное время)
//To:   16-09-2020
function sqlDateTypeTransform(dateSql) {

    let day = dateSql.getDate();
    let month = dateSql.getMonth() + 1;
    const year = dateSql.getFullYear();

    if (day < 10) {
        day = `0${day}`;
    }
    if (month < 10) {
        month = `0${month}`;
    }

    const date = `${year}-${month}-${day}`;
    return date;
}