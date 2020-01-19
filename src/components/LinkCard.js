import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';

import PostInfo from './PostInfo';
import Loading from './Loading';

import { GET_LINKS } from './Queries';
import { VOTE, DELETE_VOTE }  from './Mutations';

const LinkCard = ({ link, index, userId }) => {

  let [addVote, {loading: voteLoading}] = useMutation(VOTE, {
    update(cache, {data}) {
      const { feed } = cache.readQuery({ query: GET_LINKS });
      feed.links[index].count++;
      cache.writeQuery({
        query: GET_LINKS,
        data: {feed: feed}
      })
    }
  });

  let [deleteVote, {loading: deleteVoteLoading} ] = useMutation(DELETE_VOTE, {
    update(cache, {data}) {
      const { feed } = cache.readQuery({ query: GET_LINKS });
      feed.links[index].count--;
      cache.writeQuery({
        query: GET_LINKS,
        data: {feed: feed}
      })
    }
  });

  let [voted, setVote] = useState(false);
  let [count, setCount] = useState(link.count);
  let [loading, setLoading] = useState(true);
  
  useEffect(() => {
    let idx = link.votes.findIndex(vote => vote.user.id == userId);
    setVote((idx === -1 ? false : true))
  }, [])

  useEffect(() => {
    if (voteLoading || deleteVoteLoading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [voteLoading, deleteVoteLoading])

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

  return (
    <div className="link-container">
      <PostInfo link={link} loggedIn={true}>
        <div className="vert-mid">
          <p className={`vote-button ${(voted ? "liked" : "")}`} onClick={loading ? null : handleVote}>{count}</p>
        </div>
      </PostInfo>
    </div>
  );
}

export default LinkCard;