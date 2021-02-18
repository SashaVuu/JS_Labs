const TasksModel = require("../models/taskModel.js");
 
exports.getTaskInfo = async function (request, response){
    
    //Вытаскиваем id из запроса
    const id = request.query.id;

    //Запрос к БД 1
    const data = await TasksModel.getTaskById(id);
    //Запрос к БД 1
    const files = await TasksModel.getAllFiles(id);

    response.render("edit.hbs", {
        task: data,
        files:files
    });

};

exports.saveTaskInfo = async function (req, response){
    
    const id = req.body.taskid;

    const taskobj = {
        name: req.body.taskname,
        status: req.body.taskstatus,
        executor_surname: req.body.taskexecutor,
        start_date: req.body.taskstart,
        finish_date: req.body.taskfinish,
        idtask: id
    }

    const result = await TasksModel.updateTask(taskobj);

    const path = `../edit?id=${id}`;
    response.redirect(path);

};


exports.uploadTasks = async function (request, response){

    const id = request.body.taskid;

    let filedata = request.file;

    if(filedata){
        await TasksModel.insertNewFile(id,filedata);
    }

    const path = `../edit?id=${id}`;
    response.redirect(path);
    

};
