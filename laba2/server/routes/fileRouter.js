const express = require("express");
const editController = require("../controllers/editController.js");
const fileRouter = express.Router();
 
fileRouter.get("/*", editController.getAllFiles);

fileRouter.post("/*", editController.uploadTasks);

module.exports = fileRouter;