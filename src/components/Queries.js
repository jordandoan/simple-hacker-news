import { gql } from 'apollo-boost';

export const GET_LINKS = gql`
query GetLinks {
  feed {
    links {
      id
      description
      url
      postedBy {
        id
        name
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