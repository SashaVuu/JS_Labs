const TasksModel = require("../models/taskModel.js");
 

exports.getTasks = async function(request, response){

    let data = await TasksModel.getAll();
    response.render("tasks.hbs", {
        tasks: data
    });
};


exports.sortTasks = async function (request, response){

    console.log(request.query.sort_type);
    const status = request.query.sort_type;

    let data = await TasksModel.sortTasks(status);
    response.render("tasks.hbs", {
        tasks: data
    });
};

exports.deleteTask = async function (request, response){

    //Вытаскиваем id из запроса
    const id = request.body.id;
    console.log(`taskid-${id}`);
    
    let res = await TasksModel.deleteTask(id);

    response.redirect(".");

};

