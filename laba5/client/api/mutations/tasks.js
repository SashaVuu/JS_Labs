import {gql} from '@apollo/client'

export const ADD_TASK = gql`
mutation addTask($input:TaskAddInput) {
        addTask(input:$input)
        {
            status_code,
            message
        }
  }
`
export const DELETE_TASK = gql`
mutation deleteTask($idtask:ID) {
        deleteTask(idtask:$idtask)
        {
            status_code,
            message
        }
  }
`

export const UPDATE_TASK = gql`
mutation updateTask($idtask:ID,$input:TaskUpdateInput) {
        updateTask(idtask:$idtask,input:$input)
        {
            status_code,
            message
        }
  }
`

export const UPLOAD_FILE = gql`

mutation uploadFile($file:Upload, $idowner: Int) {
        uploadFile(file: $file, idowner: $idowner){
            status_code,
            message
        }
  }`
