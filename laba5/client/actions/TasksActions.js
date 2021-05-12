import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

import api from '../api/api';

const TasksActions = {
    getAllTasks() {
        AppDispatcher.dispatch({
            type: AppConstants.LOAD_TASKS_REQUEST
        });

        api.getAllTasks()
            .then(({
                data
            }) => {
                console.log(data.getAllTasks);
                AppDispatcher.dispatch({
                    type: AppConstants.LOAD_TASKS_SUCCESS,
                    notes: data.getAllTasks
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
            .then(({
                data
            }) => {
                console.log(data);
                AppDispatcher.dispatch({
                    type: AppConstants.GET_TASK_BY_ID,
                    notes: [data.getTaskById]
                });
            })
            .catch(err =>{
                alert(err.networkError.result.message);
                AppDispatcher.dispatch({
                    type: AppConstants.LOAD_TASKS_FAIL,
                    error: err
                })
            }
            );
    },


    sortTasks(sorting_param) {
        AppDispatcher.dispatch({
            type: AppConstants.LOAD_TASKS_REQUEST
        });

        api.getFilteredTask(sorting_param)
            .then(({
                data
            }) => {
                console.log(data);
                AppDispatcher.dispatch({
                    type: AppConstants.LOAD_TASKS_SUCCESS,
                    notes: data.getTasksByStatus
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
            .then(({
                data
            }) => {
                console.log(data);
                //TasksActions.getAllTasks();
                AppDispatcher.dispatch({
                    type: AppConstants.ADD_NEW_TASK,
                    notes: data.addTask
                });
            })
            .catch(err => {
                alert(err.networkError.result.message);
                AppDispatcher.dispatch({
                    type: AppConstants.LOAD_TASKS_FAIL,
                    error: err
                })
            }
            );
    },

    deleteTask(id) {
        api.deleteTask(id)
            .then(({
                data
            }) => {
                console.log(data);
                AppDispatcher.dispatch({
                    type: AppConstants.DELETE_TASK,
                    notes: data.deleteTask
                });
            }).catch(err => {
                alert(err.networkError.result.message);
                AppDispatcher.dispatch({
                    type: AppConstants.LOAD_TASKS_FAIL,
                    error: err
                })
            }
            );
    },

    updateTask(task) {
        api.updateTask(task)
            .then(({
                data
            }) => {
                console.log(data);
                AppDispatcher.dispatch({
                    type: AppConstants.UPDATE_TASK,
                    notes: data.updateTask
                });
            }).catch(err => {
                alert(err.networkError.result.message);
                AppDispatcher.dispatch({
                    type: AppConstants.LOAD_TASKS_FAIL,
                    error: err
                })
            }
            );
    },

    getAllFiles(id) {
        api.getAllFiles(id)
            .then(({
                data
            }) => {
                console.log("getting files");
                console.log(data);
                AppDispatcher.dispatch({
                    type: AppConstants.GET_ALL_FILES,
                    notes: data.getAllFiles
                });
            }).catch(err => {
                alert(err.networkError.result.message);
                AppDispatcher.dispatch({
                    type: AppConstants.LOAD_TASKS_FAIL,
                    error: err
                })
            }
            );
    },

    insertNewFile(file, id) {
        api.insertNewFile(file, id)
            .then(({
                data
            }) => {
                console.log(data);
                AppDispatcher.dispatch({
                    type: AppConstants.ADD_NEW_FILE,
                    notes: data
                });
                TasksActions.getAllFiles(id);
            })
            .catch(err => {
                console.log(err);
                //alert(err.networkError.result.message);
                AppDispatcher.dispatch({
                    type: AppConstants.LOAD_TASKS_FAIL,
                    error: err
                })
            });
    },

    userLogin(user) {
        api.userLogin(user)
            .then(({
                data
            }) => {
                alert(data.loginUser.message);
                console.log(data.loginUser.message);
                AppDispatcher.dispatch({
                    type: AppConstants.ADD_NEW_FILE,
                    notes: data.loginUser
                });
                //TasksActions.getAllFiles(id);
            })
            .catch(err => {
                alert(err.networkError.result.data.loginUser.message);
                AppDispatcher.dispatch({
                    type: AppConstants.LOAD_TASKS_FAIL,
                    error: err
                })
            });
    },

    userRegister(user) {
        api.userRegister(user).then(({
                data
            }) => {
                alert(data.addUser.message);
                console.log(data.addUser.message);
                AppDispatcher.dispatch({
                    type: AppConstants.ADD_NEW_FILE,
                    notes: data.addUser
                });
                //TasksActions.getAllFiles(id);
            })
            .catch(err => {
                alert(err.networkError.result.data.addUser.message);
                //alert(err.networkError.result.message);
                AppDispatcher.dispatch({
                    type: AppConstants.LOAD_TASKS_FAIL,
                    error: err
                })
            });
    },

    userLogout() {
        api.userLogout()
            .catch(err => {
                console.log("noo");
                AppDispatcher.dispatch({
                    type: AppConstants.LOAD_TASKS_FAIL,
                    error: err
                })
            });
    },



}

export default TasksActions;