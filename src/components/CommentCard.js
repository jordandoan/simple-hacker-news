import React, { useState } from 'react';

import styles from './CommentCard.module.scss';

const CommentCard = ({comment}) => {
  const [showReply, setReply] = useState(false)
  console.log(comment)
  return (
    <div className={styles.comment}>
      {comment.text}  
      <div className={styles.byline}>
        <p>posted by {comment.user.name}</p>
        <p onClick={() => setReply(!showReply)}>{showReply ? "Cancel" : "Reply"}</p>
      </div>
      {showReply && <div>Type your response here</div>}
      {comment.replies && comment.replies.map(reply => <CommentCard comment={reply}/>)}
    </div>
  )
}

export default CommentCard;