const express = require("express");
const editController = require("../controllers/editController.js");
const editRouter = express.Router();
 
editRouter.get("/", editController.getTaskInfo);
editRouter.post("/", editController.saveTaskInfo);
editRouter.post("/upload", editController.uploadTasks);

module.exports = editRouter;