const TasksModel = require("../models/taskModel.js");
 
exports.getTaskInfo = async function (request, response){
    
    const id = request.path.slice(1,request.path.length);

    console.log(id);

    const res = await TasksModel.getTaskById(id);
    
    console.log(res);

    if(res!==false){
        response.status(200).send(res);
    }
    else{
        response.status(500).send("Error");
    }
 
};

exports.getAllFiles=async function (req, response){
    console.log("GETALLFILES");
    console.log(req.path);

    const id = req.path.slice(1,req.path.length);

    console.log(`id is ${id}`);

    const files = await TasksModel.getAllFiles(id);
    
    console.log(files);

    if(files!==false){
        response.status(200).send(files);
    }
    else{
        response.status(500).send("Error");
    }
}

exports.saveTaskInfo = async function (req, response){
    
    const id = req.path.slice(1,req.path.length);
    
    const taskobj = {
        name: req.body.name,
        status: req.body.status,
        executor_surname: req.body.executor_surname,
        start_date: req.body.start_date,
        finish_date: req.body.finish_date,
        idtask: id
    }

    console.log(taskobj);
    const result = await TasksModel.updateTask(taskobj);

    if(result!==false){
        response.status(200).send("OK");
    }
    else{
        response.status(500).send("Error");
    }

};


exports.uploadTasks = async function (request, response){

    const id = request.path.slice(1,request.path.length);

    console.log(id);

    let filedata = request.file;

    //if(filedata){
    let result= await TasksModel.insertNewFile(id,filedata);
    //}

    if(result!==false){
        response.status(200).send("OK");
    }
    else{
        response.status(500).send("Error");
    }
    

};
