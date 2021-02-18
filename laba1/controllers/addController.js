const TasksModel = require("../models/taskModel.js");

exports.openTaskInfo = async function (request, response){
    const startdate = TasksModel.editDate(new Date());
    response.render("add.hbs", {
        startdate: startdate
    });
};

exports.addTask = async function (req, response){
    
    const taskobj = {
        taskname: req.body.taskname,
        taskstatus: req.body.taskstatus,
        taskexecutor: req.body.taskexecutor,
        taskstart: req.body.taskstart,
        taskfinish: req.body.taskfinish
    }

    const result = await TasksModel.addTask(taskobj);

    let messageVisible=true;
    
    response.render("add.hbs", {
        messageVisible: messageVisible
    });

};