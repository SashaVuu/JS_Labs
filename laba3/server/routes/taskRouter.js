const express = require("express");
const taskController = require("../controllers/taskController.js");
const editController = require("../controllers/editController.js");
const taskRouter = express.Router();
const mw = require("../middleware/jwt.js");

taskRouter.get("/sort", taskController.sortTasks);
taskRouter.get("/", taskController.getTasks);
taskRouter.delete("/*",mw.verifyJWT, taskController.deleteTask);
taskRouter.put("/*",mw.verifyJWT, editController.saveTaskInfo);

module.exports = taskRouter;