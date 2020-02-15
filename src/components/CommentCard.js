import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { CREATE_COMMENT } from './Mutations';

import styles from './CommentCard.module.scss';



const CommentCard = ({comment, linkID }) => {
  const [showReply, setReply] = useState(false)
  const [fields, setFields] = useState({reply_to: comment.id, text: ""})
  const [createComment, other] = useMutation(CREATE_COMMENT)

  const handleChange = (e) => {
    e.preventDefault()
    setFields({...fields, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createComment({variables: {...fields, link: linkID }})
      .then(res => {
        window.location.reload(true)
      })
  }
  return (
    <div className={styles.comment}>
      {comment.text}  
      <div className={styles.byline}>
        <p>posted by {comment.user.name}</p>
        <p onClick={() => setReply(!showReply)}>{showReply ? "Cancel" : "Reply"}</p>
      </div>
      {showReply && <><input placeholder="Add a comment..." name="text" value={fields.text} onChange={handleChange}/><button onClick={handleSubmit}>Reply</button></>}
      {comment.replies && comment.replies.map(reply => <CommentCard comment={reply}/>)}
    </div>
  )
}

export default CommentCard;