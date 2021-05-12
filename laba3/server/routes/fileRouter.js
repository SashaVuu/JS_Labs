const express = require("express");
const editController = require("../controllers/editController.js");
const fileRouter = express.Router();
const mw = require("../middleware/jwt.js");


fileRouter.get("/*",mw.verifyJWT, editController.getAllFiles);
fileRouter.post("/*",mw.verifyJWT, editController.uploadTasks);

module.exports = fileRouter;