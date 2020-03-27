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
  comment_count
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

export const GET_LINK = gql`
query GetLink ($id: ID!) {
  link(id: $id) {
    ...linkInfo
    comments {
      id
      user {
        name
      }
      text
      replies {
        user {
          name
        }
        text
      }
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