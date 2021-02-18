const express = require("express");
const addController = require("../controllers/addController.js");
const addRouter = express.Router();
 
addRouter.get("/", addController.openTaskInfo);
addRouter.post("/", addController.addTask);


module.exports = addRouter;