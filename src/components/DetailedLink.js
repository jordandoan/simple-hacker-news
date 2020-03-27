import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import CommentContainer from './CommentContainer';

import { GET_LINK } from './Queries';


const DetailedLink = (props) => {
  const linkID = props.match.params.linkID
  const { data, loading } = useQuery(GET_LINK, { variables: { id: linkID }})  
  const link = data && data.link

  if (loading) return <div>Finding post...</div>
  return (
    <div>
      <button onClick={props.history.goBack}>Go back</button>
      <p>{link.url} {link.description}</p>
      <CommentContainer comments={link.comments} linkID={linkID} />
    </div>
  )
}

export default DetailedLink;