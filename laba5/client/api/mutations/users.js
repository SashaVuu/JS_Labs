import {gql} from '@apollo/client'

export const ADD_USER = gql`
mutation addUser($input:UserAddInput) {
        addUser(input:$input)
        {
            status_code,
            message
        }
  }
`

export const LOGIN_USER = gql`
mutation loginUser($input:UserLoginInput) {
        loginUser(input:$input)
        {
            status_code,
            message
        }
  }
`

