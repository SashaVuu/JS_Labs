import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

import api from '../api/api';

const TasksActions = {
    getAllTasks() {
        AppDispatcher.dispatch({
            type: AppConstants.LOAD_TASKS_REQUEST
        });

        api.getAllTasks()
            .then((data) => {
                console.log("In Task Action");
                console.log(data);
                AppDispatcher.dispatch({
                    type: AppConstants.LOAD_TASKS_SUCCESS,
                    notes: data
                });
            })
            .catch(err =>
                AppDispatcher.dispatch({
                    type: AppConstants.LOAD_TASKS_FAIL,
                    error: err
                })
            );
    },

    getTaskById(id) {
        AppDispatcher.dispatch({
            type: AppConstants.LOAD_TASKS_REQUEST
        });

        api.getTaskById(id)
            .then((data) => {
                AppDispatcher.dispatch({
                    type: AppConstants.GET_TASK_BY_ID,
                    notes: data
                });
            })
            .catch(err =>
                AppDispatcher.dispatch({
                    type: AppConstants.LOAD_TASKS_FAIL,
                    error: err
                })
            );
    },


    sortTasks(sorting_param) {
        AppDispatcher.dispatch({
            type: AppConstants.LOAD_TASKS_REQUEST
        });

        api.getFilteredTask(sorting_param)
            .then((data) => {
                AppDispatcher.dispatch({
                    type: AppConstants.LOAD_TASKS_SUCCESS,
                    notes: data
                });
            })
            .catch(err =>
                AppDispatcher.dispatch({
                    type: AppConstants.LOAD_TASKS_FAIL,
                    error: err
                })
            );
    },

    addNewTask(task) {
        api.addTask(task)
            .then((data) => {
                AppDispatcher.dispatch({
                    type: AppConstants.ADD_NEW_TASK,
                    notes: data
                });
            });
    },

    deleteTask(id) {
        api.deleteTask(id)
            .then((data) => {
                AppDispatcher.dispatch({
                    type: AppConstants.DELETE_TASK,
                    notes: data
                });
            });
    },

    updateTask(task) {
        api.updateTask(task)
            .then(({
                data
            }) => {
                AppDispatcher.dispatch({
                    type: AppConstants.UPDATE_TASK,
                    notes: data
                });
            });
    },

    getAllFiles(id) {
        api.getAllFiles(id)
            .then((data) => {
                console.log("getting files");
                AppDispatcher.dispatch({
                    type: AppConstants.GET_ALL_FILES,
                    notes: data
                });
            });
    },

    insertNewFile(file, id) {
        api.insertNewFile(file, id)
            .then((data) => {
                console.log("YEEee");
                AppDispatcher.dispatch({
                    type: AppConstants.ADD_NEW_FILE,
                    notes: data
                });
                TasksActions.getAllFiles(id);
            })
            .catch(err => {
                console.log("nooe");
                AppDispatcher.dispatch({
                    type: AppConstants.LOAD_TASKS_FAIL,
                    error: err
                })
            });
    },

    userLogin(user) {
        api.userLogin(user)
            .catch(err => {
                console.log("noo");
                AppDispatcher.dispatch({
                    type: AppConstants.LOAD_TASKS_FAIL,
                    error: err
                })
            });
    },

    userRegister(user) {
        api.userRegister(user)
            .catch(err => {
                console.log("noo");
                AppDispatcher.dispatch({
                    type: AppConstants.LOAD_TASKS_FAIL,
                    error: err
                })
            });
    },

    userLogout() {
        api.userLogout();
    }

}

export default TasksActions;