import { gql } from 'apollo-boost';

export const GET_LINKS = gql`
query GetLinks {
  feed {
    links {
      id
      description
      url
    }
  }
}
`