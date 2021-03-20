const TasksModel = require("../models/taskModel.js");
 

exports.getTasks = async function(request, response){

    let data = await TasksModel.getAll();
    console.log(data);

    if(data!==false){
        response.status(200).send(data);
    }
    else{
        response.status(500).send("Error");
    }
    
};


exports.sortTasks = async function (request, response){


    console.log(request.query.sort_type);
    const status = request.query.sort_type;
    

    let data = await TasksModel.sortTasks(status);


    if(data!==false){
        response.status(200).send(data);
    }
    else{
        response.status(500).send("Error");
    }

};

exports.deleteTask = async function (request, response){

    console.log(request.path);
    //Вытаскиваем id из запроса
    const id = request.path.slice(1,request.path.length);

    console.log(`taskid-${id}`);
    
    let res = await TasksModel.deleteTask(id);

    response.status(200).send("OK");

};

