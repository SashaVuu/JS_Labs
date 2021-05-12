const express = require("express");
const addController = require("../controllers/addController.js");
const addRouter = express.Router();
const mw = require("../middleware/jwt.js");

addRouter.post("/*",mw.verifyJWT, addController.addTask);

module.exports = addRouter;