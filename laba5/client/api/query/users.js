import {gql} from '@apollo/client'


export const LOGOUT_USER = gql`
query logout{
        logout
        {
            status_code,
            message
        }
  }
`