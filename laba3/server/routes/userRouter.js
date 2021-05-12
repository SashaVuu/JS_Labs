const express = require("express");
const userController = require("../controllers/userController.js");
const userRouter = express.Router();
const mw = require("../middleware/jwt.js");


userRouter.post("/login",userController.login);
userRouter.post("/register", userController.register);
userRouter.post("/logout",userController.logout);

module.exports = userRouter;