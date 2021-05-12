const TasksModel = require("../models/taskModel.js");


exports.addTask = async function (req, response){
    
    console.log(req.body);
    const taskobj = {
        name: req.body.name,
        status: req.body.status,
        executor: req.body.executor_surname,
        start: req.body.start_date,
        finish: req.body.finish_date
    }

    //console.log(taskobj);
    const result = await TasksModel.addTask(taskobj);

    if(result!==false){
        response.status(200).send("OK");
    }
    else{
        response.status(500).send("Error");
    }

};