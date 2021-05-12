const TasksModel = require("../models/taskModel.js");

//+
exports.getTasks = function (socket) {
    socket.on("get_all_tasks", async function (data, callback) {

        console.log("----GET_ALL_TASKS------");
        console.log("Data:");
        console.log(data);

        let sqldata = await TasksModel.getAll();
        console.log("Data from DB:");
        console.log(sqldata);

        if (sqldata !== false) {
            callback({
                statusCode: 200,
                result: sqldata
            });
        } else {
            callback({
                statusCode: 400,
                message: "Error while trying to get tasks."
            });
        }
    });
};

//+
exports.sortTasks = function (socket) {

    socket.on("sort_tasks", async function (data, callback) {
        console.log("----SORT_TASKS------");
        console.log("Data:");
        console.log(data);

        let sqldata = await TasksModel.sortTasks(data);
        console.log("Data from DB:");
        console.log(sqldata);

        if (sqldata !== false) {
            callback({
                statusCode: 200,
                result: sqldata
            });
        } else {
            callback({
                statusCode: 400,
                message: "Error while trying to get filtered tasks."
            });
        }

    });

};

//+
exports.deleteTask = function (socket) {

    socket.on("delete_task", async function (data, callback) {
        console.log("----DELETE_TASKS------");
        console.log("Data:");
        console.log(data);

        let res = await TasksModel.deleteTask(data.id);

        callback({
            statusCode: 200,
            message: "OK"
        });

    });

};

//+
exports.addTask = function (socket) {

    socket.on("add_task", async function (data, callback) {
        console.log("----ADD_TASK------");
        console.log("Data:");
        console.log(data);

        const task = {
            name: data.task.name,
            status: data.task.status,
            executor: data.task.executor_surname,
            start: data.task.start_date,
            finish: data.task.finish_date
        }

        const result = await TasksModel.addTask(task);

        if (result !== false) {
            callback({
                statusCode: 200,
                message: "OK"
            });
        } else {
            callback({
                statusCode: 400,
                message: "Error while trying to add task."
            });
        }

    });

};

//+
exports.getTaskInfo = function (socket) {

    socket.on("get_task_by_id", async function (data, callback) {
        console.log("----GET_TASK_BY_ID------");
        console.log("Data:");
        console.log(data);

        const sqldata = await TasksModel.getTaskById(data.id);
        console.log("Data from DB:");
        console.log(sqldata);

        if (sqldata !== false) {
            callback({
                statusCode: 200,
                result: sqldata
            });
        } else {
            callback({
                statusCode: 400,
                message: "Error while trying to get task."
            });
        }

    });

};

//+
exports.saveTaskInfo = function (socket) {

    socket.on("update_task", async function (data, callback) {
        console.log("----UPDATE_TASK------");
        console.log("Data:");
        console.log(data.task);

        const task= {
            name: data.task.name,
            status: data.task.status,
            executor_surname: data.task.executor_surname,
            start_date: data.task.start_date,
            finish_date: data.task.finish_date,
            idtask: data.task.idtask
        }

        const result = await TasksModel.updateTask(task);

        if (result !== false) {
            callback({statusCode: 200,message: "OK"});
        } 
        else {
            callback({statusCode: 400,message: "Error while trying to update task."});
        }
    });
    
};