import {EventEmitter} from 'events';

import AppDispatcher from "../dispatcher/AppDispatcher";
import AppConstants from "../constants/AppConstants";

const CHANGE_EVENT = 'change';

let _tasks=[];
let _task_to_edit = {
    idtask:'',
    name:'',
    status:'in_process',
    start_date:'2021-05-03',
    finish_date:'2021-06-03',
    executor_surname:'' 
};

let _files=[{}];

let _loadingError = null;
let _isLoading = true;

//!!!!
function formatTask(task){
    return{
        idtask:task.idtask,
        name:task.name,
        status:task.status,
        start_date:task.start_date,
        finish_date:task.finish_date,
        executor_surname:task.executor_surname
    }
}

function formatFile(file){
    return{
        idfile:file.idfile,
        filename:file.filename,
        originalname:file.originalname,
        path:file.path,
        idowner:file.idowner
    }
}

//Another task
const TasksStore = Object.assign({},EventEmitter.prototype,{
    isLoading(){
        return _isLoading;
    },

    getTasks(){
        return _tasks;
    },

    getTask(){
        return _task_to_edit;
    },

    getFiles(){
        return _files;
    },


    //Произвести какое-то изменение с данными для того чтобы
    //наши компоненты смогли их обновить внутри себя
    emitChange:function(){
        this.emit(CHANGE_EVENT);
    },

    //Методы ивентэмитера, добавляют и удаляют слушателя для события
    addChangeListener: function(callback){
        this.on(CHANGE_EVENT,callback);
    },

    removeChangeListener:function(callback){
        this.removeListener(CHANGE_EVENT,callback);
    }
});

AppDispatcher.register(function(action){
    switch (action.type){

        case AppConstants.LOAD_TASKS_REQUEST:{
            _isLoading = true;

            TasksStore.emitChange();
            break;
        }
        case AppConstants.LOAD_TASKS_SUCCESS:{
            _isLoading=false;
            _tasks=action.notes.map(formatTask);
            _loadingError=null;

            console.log('there');
            TasksStore.emitChange();
            break;
        }

        case AppConstants.LOAD_TASKS_FAIL:{
            _loadingError=action.error;
            console.log(action.error);
            TasksStore.emitChange();
            break;
        }

        case AppConstants.ADD_NEW_TASK:{
            _isLoading=false;

            console.log("added");

            TasksStore.emitChange();
            break;
        }

        case AppConstants.DELETE_TASK:{
            _isLoading=false;

            console.log("deleted");

            TasksStore.emitChange();
            break;
        }

        case AppConstants.UPDATE_TASK:{
            _isLoading=false;

            console.log("updated");

            TasksStore.emitChange();
            break;
        }

        case AppConstants.GET_TASK_BY_ID:{
            _isLoading=false;

            _task_to_edit=action.notes.map(formatTask)[0];

            console.log(action.notes);

            TasksStore.emitChange();
            break;
        }

        case AppConstants.GET_ALL_FILES:{
            _isLoading=false;
            _files=action.notes.map(formatFile);
            TasksStore.emitChange();
            break;
        }

        case AppConstants.ADD_NEW_FILE:{
            _isLoading=false;

            console.log("added_new!!!");

            TasksStore.emitChange();
            break;
        }

        default:{
            console.log('No such handler');
        }
    }
});

export default TasksStore;