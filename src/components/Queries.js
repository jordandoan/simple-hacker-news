import { gql } from 'apollo-boost';

export const GET_LINKS = gql`
query GetLinks {
  feed {
    links {
      id
      description
      url
      count
      postedBy {
        id
        name
      }
      votes {
        user {
          id
        }
      }
    }
  }
}
`

export const GET_USER = gql`
query User {
  me {
    id
    name
  }
}
`