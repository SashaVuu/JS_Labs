const express = require("express");
const taskController = require("../controllers/taskController.js");
const taskRouter = express.Router();
 
taskRouter.get("/sort", taskController.sortTasks);
taskRouter.get("/", taskController.getTasks);
taskRouter.post("/", taskController.deleteTask);

module.exports = taskRouter;