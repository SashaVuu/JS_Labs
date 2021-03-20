const express = require("express");
const userController = require("../controllers/userController.js");
const userRouter = express.Router();

userRouter.post("/login", userController.login);
userRouter.post("/register", userController.register);

module.exports = userRouter;