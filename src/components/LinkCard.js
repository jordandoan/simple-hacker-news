import React, { useState, useEffect } from 'react';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { GET_LINKS, LINK_FRAGMENT } from './Queries';

const DELETE = gql`
  mutation Delete($id: ID!) {
    deleteLink(id: $id) {
      id
    }
  }
`
const EDIT = gql`
  mutation Edit($id: ID!, $url: String!, $description: String!) {
    updateLink(id: $id, url: $url, description: $description) {
      ...linkInfo
    }
  }
  ${LINK_FRAGMENT}
`
const VOTE = gql`
  mutation vote($linkId: ID!) {
    vote(linkId: $linkId) {
      id
    }
  }
`

const DELETE_VOTE = gql`
  mutation deleteVote($linkId: ID!) {
    deleteVote(linkId: $linkId) {
      id
    }
  }
`

const LinkCard = ({ link, index, user }) => {
  let [deleteLink, deleteLinkStatus] = useMutation(DELETE, {
    update(cache, {data}) {
      const { feed } = cache.readQuery({ query: GET_LINKS });
      feed.links.splice(index, 1)
      cache.writeQuery({
        query: GET_LINKS,
        data: {feed: feed}
      })
    }
  });

  let [editLink, editLinkStatus] = useMutation(EDIT, {
    update(cache, {data}) {
      const { feed } = cache.readQuery({ query: GET_LINKS });
      let link = feed.links[index];
      feed.links[index] = {...link, data}
      cache.writeQuery({
        query: GET_LINKS,
        data: {feed: feed}
      })
    }
  });

  let [addVote, addVoteStatus] = useMutation(VOTE, {
    update(cache, {data}) {
      const { feed } = cache.readQuery({ query: GET_LINKS });
      feed.links[index].count++;
      cache.writeQuery({
        query: GET_LINKS,
        data: {feed: feed}
      })
    }
  });

  let [deleteVote, deleteVoteStatus] = useMutation(DELETE_VOTE, {
    update(cache, {data}) {
      const { feed } = cache.readQuery({ query: GET_LINKS });
      feed.links[index].count--;
      cache.writeQuery({
        query: GET_LINKS,
        data: {feed: feed}
      })
    }
  });

  let [formActive, setForm] = useState(false);
  let [fields, setFields] = useState({url: link.url, description: link.description})
  let [voted, setVote] = useState(false);
  let [count, setCount] = useState(link.count);
  let [hidden, setHidden] = useState(false);
  
  useEffect(() => {
    let idx = link.votes.findIndex(vote => vote.user.id == user.id);
    setVote((idx === -1 ? false : true))
  }, [])

  const handleDelete = () => {
    deleteLink({variables: {id: link.id}})
    setHidden(true)
  }

  const handleVote = () => {
    if (voted) {
      deleteVote({variables: {linkId: link.id}})
      setCount(count -= 1)
    } else {
      addVote({variables: {linkId: link.id}})
      setCount(count += 1)
    }
    setVote(!voted)
  }

  const handleChange = (e) => {
    setFields({...fields, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    editLink({variables: {...fields, id: link.id}})
    setForm(false);
  }

  return (
    <div className={"link-container" + " " + (hidden ? "hidden" : "")}>
      {!formActive && 
      (<>
        <p>{link.url}</p>
          <p>{link.description}</p>
          <p>Posted by: {link.postedBy.name}</p>
          <p className={"vote-button" + " " + (voted ? "liked" : "")} onClick={handleVote}> {(voted) ? 'Liked' : 'Like' } {count}</p>
          {link.postedBy.id == user.id  && 
            <>
              <button onClick={() => handleDelete()}>Delete</button>
              <button onClick={() => setForm(true)}>Edit</button>
            </>}
      </>)
      }
      {formActive && 
        <form>
          <div>
            <input name="url" value={fields.url} onChange={e => handleChange(e)}/>
          </div>
          <div>
            <textarea name="description" value={fields.description} onChange={e => handleChange(e)}/>
          </div>
          <button onClick={(e) => handleSubmit(e)}>Save changes</button>
        </form>
      }
    </div>
  );
}

export default LinkCard;