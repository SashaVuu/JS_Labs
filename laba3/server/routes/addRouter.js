const express = require("express");
const addController = require("../controllers/addController.js");
const addRouter = express.Router();


addRouter.post("/*", addController.addTask);


module.exports = addRouter;