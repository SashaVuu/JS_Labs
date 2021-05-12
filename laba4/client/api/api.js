import axios from 'axios';
import {socket} from '../components/App.jsx'

import Cookies from 'js-cookie';
const SocketIOFileUpload = require('socketio-file-upload');


export default {

    //+
    getAllTasks() {
        return new Promise((resolve, reject) => {
            socket.emit("get_all_tasks", {}, function (data) {

                console.log("IN SOCKET EMIT");
                console.log(data);
                if (data.statusCode == 400) {
                    console.log(data.message);
                    reject(data.message)
                }
                if (data.statusCode == 200) {
                    console.log(data.result);
                    resolve(data.result)
                }
            });
        })
    },

    //+
    getFilteredTask(type) {
        return new Promise((resolve, reject) => {
            socket.emit("sort_tasks", type, function (data) {

                console.log("IN SOCKET SORT");
                console.log(data);
                if (data.statusCode == 400) {
                    console.log(data.message);
                    reject(data.message)
                }
                if (data.statusCode == 200) {
                    console.log(data.result);
                    resolve(data.result)
                }
            });
        });
    },

    //+
    getTaskById(id) {

        return new Promise((resolve, reject) => {
            socket.emit("get_task_by_id",{id:id,cookie:Cookies.get('auth-token')}, function (data) {

                console.log("IN SOCKET GET BY ID");
                console.log(data);

                if (data.statusCode == 400) {
                    console.log(data.message);
                    reject(data.message)
                }
                if (data.statusCode == 200) {
                    console.log(data.result);
                    resolve(data.result)
                }
            });
        });
    },

    //+
    addTask(task) {

        return new Promise((resolve, reject) => {
            socket.emit("add_task", {task:task,cookie:Cookies.get('auth-token')}, function (data) {

                console.log("IN SOCKET ADD");
                console.log(data);

                if (data.statusCode == 400) {
                    console.log(data.message);
                    reject(data.message)
                }
                if (data.statusCode == 200) {
                    console.log(data.message);
                    resolve(data.message)
                }
            });
        });
    },

    //+
    deleteTask(id) {
        return new Promise((resolve, reject) => {
            socket.emit("delete_task", {id:id,cookie:Cookies.get('auth-token')}, function (data) {

                console.log("IN SOCKET DELETE");
                console.log(data);

                if (data.statusCode == 400) {
                    console.log(data.message);
                    reject(data.message)
                }
                if (data.statusCode == 200) {
                    console.log(data.message);
                    resolve(data.message)
                }
            });
        });
    },

    //+
    updateTask(task) {
        return new Promise((resolve, reject) => {
            socket.emit("update_task", {task:task,cookie:Cookies.get('auth-token')}, function (data) {

                console.log("IN SOCKET UPDATE");
                console.log(data);

                if (data.statusCode == 400) {
                    console.log(data.message);
                    reject(data.message)
                }
                if (data.statusCode == 200) {
                    console.log(data.message);
                    resolve(data.message)
                }
            });
        });
    },

    //+
    getAllFiles(id) {
        return new Promise((resolve, reject) => {
            socket.emit("get_all_files", {id:id,cookie:Cookies.get('auth-token')}, function (data) {
                console.log("IN SOCKET GET ALL FILES");
                console.log(data);

                if (data.statusCode == 400) {
                    console.log(data.message);
                    reject(data.message)
                }
                if (data.statusCode == 200) {
                    console.log(data.result);
                    resolve(data.result)
                }
            });
        });
    },

    userLogin(user) {
        return new Promise((resolve, reject) => {
            socket.emit("login", {user:user, cookie:Cookies.get('auth-token') }, function (data) {

                console.log("IN SOCKET ADD");
                console.log(data);

                if (data.statusCode == 401) {
                    alert(data.message);
                }
                if (data.statusCode == 200) {
                    //1 day 
                    Cookies.set('auth-token', data.token, { expires: 1 });
                    socket.disconnect().connect();
                    alert(data.message);
                }
            });
            
        });
    },

    userRegister(user) {
        return new Promise((resolve, reject) => {
            socket.emit("register", user, function (data) {

                console.log("IN SOCKET DELETE");
                console.log(data);

                if (data.statusCode == 409) {
                    alert(data.message);
                    reject(data.message)
                }
                if (data.statusCode == 200) {
                    alert(data.message);
                    resolve(data.message)
                }
            });
        });
    },

    userLogout() {
        Cookies.remove('auth-token');
        socket.disconnect().connect();
    },

    //+
    insertNewFile(file, id) {
        return new Promise((resolve, reject) =>{
            socket.emit("upload_file", {idowner:id,filename:file.name,cookie:Cookies.get('auth-token')}, function (data) {
                var uploader = new SocketIOFileUpload(socket);
                
                uploader.submitFiles([file]);

                if (data.statusCode==400){
                    console.log(data.msg);
                    reject(data)
                }
                if (data.statusCode==200){
                    resolve(data.result)
                }
              });
        })
    }
}