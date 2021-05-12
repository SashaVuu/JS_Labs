const express = require("express");
const taskController = require("../controllers/taskController.js");
const editController = require("../controllers/editController.js");
const taskRouter = express.Router();
 
taskRouter.get("/sort", taskController.sortTasks);
taskRouter.get("/", taskController.getTasks);
taskRouter.delete("/*", taskController.deleteTask);
taskRouter.put("/*", editController.saveTaskInfo);

module.exports = taskRouter;