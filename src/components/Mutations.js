import { gql } from 'apollo-boost';
import { LINK_FRAGMENT } from './Queries';

export const DELETE = gql`
  mutation Delete($id: ID!) {
    deleteLink(id: $id) {
      id
    }
  }
`
export const EDIT = gql`
  mutation Edit($id: ID!, $url: String!, $description: String!) {
    updateLink(id: $id, url: $url, description: $description) {
      ...linkInfo
    }
  }
  ${LINK_FRAGMENT}
`
export const VOTE = gql`
  mutation vote($linkId: ID!) {
    vote(linkId: $linkId) {
      id
    }
  }
`

export const DELETE_VOTE = gql`
  mutation deleteVote($linkId: ID!) {
    deleteVote(linkId: $linkId) {
      id
    }
  }
`

export const CREATE_COMMENT = gql`
  mutation CREATE_COMMENT ($link: ID!, $text: String!, $reply_to: ID) {
    createComment(link: $link, text: $text, reply_to: $reply_to) {
      text
    }
  }
`