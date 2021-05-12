const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const multer = require("multer"); //for file upload
const taskRouter = require("./routes/taskRouter.js");
const editRouter = require("./routes/editRouter.js");
const addRouter = require("./routes/addRouter.js");

app.set("view engine", "hbs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({dest: "uploads"}).single("filedata"));
app.use(express.static(__dirname));


app.use("/add", addRouter);
app.use("/edit", editRouter);
app.use("/", taskRouter);

app.use(function (req, res, next) {
    res.status(404).send("Not Found");
});
 
app.listen(3000);