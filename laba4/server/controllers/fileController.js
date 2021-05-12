const TasksModel = require("../models/taskModel.js");
const fs = require('fs');
const path = require('path');
var siofu = require("socketio-file-upload")

//+
exports.getAllFiles=function (socket){

    socket.on("get_all_files", async function (data, callback) {

        console.log("----GET_ALL_TASKS------");
        console.log("Data:");
        console.log(data);

        let id = data.id;

        let sqldata = await TasksModel.getAllFiles(id);
        
        console.log("Data from DB:");
        console.log(sqldata);

        if (sqldata !== false) {
            callback({
                statusCode: 200,
                result: sqldata
            });
        } else {
            callback({
                statusCode: 400,
                message: "Error while trying to get files."
            });
        }
    });

}

//+
exports.uploadFile =  function (socket,uploader){

    socket.on("upload_file", async function (data, callback) {
        try {
            console.log("----UPLOAD_FILE------");
            console.log("Data:");
            console.log(data);

            //uploader.dir = __dirname.substring(0, __dirname.length - 11)+'uploads';
            //console.log(`PATH : ${uploader.dir}`);
            const dir = __dirname.substring(0, __dirname.length - 11) + 'uploads'

            console.log(`PATH : ${dir}`);

            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }

            uploader.dir = dir;

            let file = {
                filename: data.filename,
                originalname: data.filename,
                path: __dirname.substring(0, __dirname.length - 11) + 'uploads'
            }

            await TasksModel.insertNewFile(data.idowner, file);
            
            callback({
                    statusCode: 200,
                    msg: 'Success.'
            });

        } catch (e) {
            console.log(e.message);
            callback({
                statusCode: 400,
                msg: 'Error on file uploading'
            });
        }
         
   });

};