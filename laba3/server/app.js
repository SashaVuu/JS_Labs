const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const multer = require("multer"); //for file upload

const taskRouter = require("./routes/taskRouter.js");
const editRouter = require("./routes/editRouter.js");
const addRouter = require("./routes/addRouter.js");
const fileRouter = require("./routes/fileRouter.js");
const userRouter = require("./routes/userRouter.js");

const cors = require('cors');

app.set("view engine", "hbs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(multer({dest: "uploads"}).single("text_file"));
app.use(express.static(__dirname));
app.use(cors()); //c 8000 to 3000
app.use(cookieParser());


app.use("/add", addRouter);
app.use("/edit", editRouter);
app.use("/tasks", taskRouter);
app.use("/files", fileRouter);
app.use("/user", userRouter);

app.use(function (req, res, next) {
    res.status(404).send("Not Found");
});
 
app.listen(3000);