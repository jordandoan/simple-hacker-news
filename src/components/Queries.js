import { gql } from 'apollo-boost';

export const LINK_FRAGMENT = gql`
fragment linkInfo on Link {
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
`
export const GET_LINKS = gql`
query GetLinks {
  feed {
    links {
      ...linkInfo
    }
  }
}
${LINK_FRAGMENT}
`

export const GET_USER = gql`
query User {
  me {
    id
    name
  }
}
`