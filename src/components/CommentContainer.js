import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';

import CommentCard from './CommentCard';

import { GET_LINK } from './Queries';
import { CREATE_COMMENT } from './Mutations';

const CommentContainer = ({ comments, linkID }) => {
  const [fields, setFields] = useState({text: ""})
  const [createComment, other] = useMutation(CREATE_COMMENT, {
    update(cache, {data}) {
      const { link } = cache.readQuery({query: GET_LINK, variables: { id: linkID }});
      link.comments.push(data.createComment);
      link.comment_count++;
      cache.writeQuery({
        query: GET_LINK,
        data: { link }
      })
    } 
   })

  const handleChange = (e) => {
    e.preventDefault()
    setFields({...fields, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createComment({variables: {...fields, link: linkID }})
      .then(res => {
        setFields({...fields, text: ""})
      })
  }

  return (
    <div>
      Comments
      <textarea placeholder="Add a comment..." name="text" value={fields.text} onChange={handleChange}/>
      <button onClick={handleSubmit}>Submit</button>
      <div>
        {comments.map(comment => <CommentCard comment={comment}/>)}
      </div>
    </div>
  )
}

export default CommentContainer;