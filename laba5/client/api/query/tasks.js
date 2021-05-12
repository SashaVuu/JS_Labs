import {gql} from '@apollo/client'

export const GET_ALL_TASKS = gql`
    query {
        getAllTasks{
            idtask,
            name,
            status,
            start_date,
            finish_date,
            executor_surname
        }
    }
`

export const GET_TASKS_BY_STATUS = gql`
query getTasksByStatus($status:String){
    getTasksByStatus(status:$status){
        idtask,
        name,
        status,
        start_date,
        finish_date,
        executor_surname
    }
  } 
`


export const GET_TASK_BY_ID = gql`
query getTaskById($idtask:ID){
    getTaskById(idtask:$idtask){
        idtask,
        name,
        status,
        start_date,
        finish_date,
        executor_surname
    }
  } 
`

export const GET_ALL_FILES = gql`
query getAllFiles($idtask:ID){
    getAllFiles(idtask:$idtask){
        idfile,
        filename,
        originalname,
        path,
        idowner
    }
  } 
`
