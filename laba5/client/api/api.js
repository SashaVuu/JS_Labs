import axios from 'axios';
import {ApolloClient, InMemoryCache} from "@apollo/client"
const { useQuery } = require("@apollo/client")
import {GET_ALL_TASKS,GET_TASKS_BY_STATUS,GET_TASK_BY_ID,GET_ALL_FILES} from './query/tasks.js'
import {ADD_TASK,DELETE_TASK,UPDATE_TASK,UPLOAD_FILE} from './mutations/tasks.js'
import {ADD_USER, LOGIN_USER} from './mutations/users.js'
import {LOGOUT_USER} from './query/users.js'
import { createUploadLink } from "apollo-upload-client";

const link = createUploadLink({ uri: "http://localhost:3000/graphql",  credentials: 'include'});

const defaultOptions = {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
}


const client = new ApolloClient ({
    link,
    cache : new InMemoryCache(),
    defaultOptions:defaultOptions
})


export default {

    getAllTasks() {
        return client.query({query:GET_ALL_TASKS});
    },

    getFilteredTask(type){
        return client.query({query:GET_TASKS_BY_STATUS,variables:{status:type}});
    },

    getTaskById(id){
        return client.query({query:GET_TASK_BY_ID,variables:{idtask:id}});
    },

    addTask(task) {
        //console.log(client.mutate({mutation:ADD_TASK,variables:{input:task}}));
        return client.mutate({mutation:ADD_TASK,variables:{input:task}})
    },

    deleteTask(id) {
        return client.mutate({mutation:DELETE_TASK,variables:{idtask:id}})
    },

    updateTask(task) {
        console.log("Task");
        console.log(task);
        const task_obj = {
            status:task.status,
            finish_date:task.finish_date
        }
        return client.mutate({mutation:UPDATE_TASK,variables:{idtask:task.idtask,input:task_obj}})
    },

    getAllFiles(id){
        return client.query({query:GET_ALL_FILES,variables:{idtask:id}})
    },

    userLogin(user){
        //console.log(client.mutate({mutation:LOGIN_USER,variables:{input:user}}))
        return client.mutate({mutation:LOGIN_USER,variables:{input:user}});
    },

    userRegister(user){

        return client.mutate({mutation:ADD_USER,variables:{input:user}})
    },

    userLogout(){
        return client.query({query:LOGOUT_USER});
    },

    insertNewFile(file,id) {
        return client.mutate({mutation:UPLOAD_FILE,variables:{file:file,idowner: parseInt(id)}});
    }

}