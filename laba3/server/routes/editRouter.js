const express = require("express");
const editController = require("../controllers/editController.js");
const editRouter = express.Router();
const mw = require("../middleware/jwt.js");

editRouter.get("/*",mw.verifyJWT, editController.getTaskInfo);

editRouter.put("/*",mw.verifyJWT, editController.saveTaskInfo);


module.exports = editRouter;