const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const socketIo =require("socket.io")
const http = require("http");
const auth = require("./middleware/jwt.js");
var siofu = require("socketio-file-upload");

const taskController = require("./controllers/taskController.js");
const userController = require("./controllers/userController.js");
const fileController = require("./controllers/fileController.js");

const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(__dirname));

app.use(cors({
    origin: 'http://localhost:8081',
    credentials: true
})); //c 8000 to 3000

app.use(cookieParser());

// Создаю сервер
const server = http.createServer(app);

var io = socketIo(server, {
    cors: {
       origin: 'http://localhost:8081',
       credentials: true
    }
 });


//Установка соединения
io.on("connection",socket =>{
    console.log("New client connected!!!");
    
    //packet[0] имя ивента
    socket.use((packet,next) => {
        auth.verifyJWT(socket,packet,next)
    });

    socket.on('error', err => {
        console.log("ERROR:");
        console.log(err);
        socket.emit('auth_error', {statusCode : err.statusCode, message : err.message} );
    })

    addListeners(socket);
    socket.on("disconnect", () => console.log("Client disconnected"));
    
});


function addListeners(socket) {
    taskController.getTasks(socket);
    taskController.sortTasks(socket);
    taskController.addTask(socket);
    taskController.deleteTask(socket);
    taskController.getTaskInfo(socket);
    taskController.saveTaskInfo(socket);

    userController.login(socket);
    userController.register(socket);

    fileController.getAllFiles(socket);

    var uploader = new siofu();
    //uploader.dir = __dirname+'/uploads';
    uploader.listen(socket);
    fileController.uploadFile(socket, uploader);

}

// app.use(function (req, res, next) {
//     res.status(404).send("Not Found");
// });
 

server.listen(3000);