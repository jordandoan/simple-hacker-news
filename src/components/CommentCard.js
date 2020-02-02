import React from 'react';

import styles from './CommentCard.module.scss';

const CommentCard = ({comment}) => {
  console.log(comment)
  return (
    <div className={styles.comment}>
      {comment.text}  posted by {comment.user.name}
      {comment.replies && comment.replies.map(reply => <CommentCard comment={reply}/>)}
    </div>
  )
}

export default CommentCard;