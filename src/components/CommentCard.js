import React from 'react';

const CommentCard = ({comment}) => {
  return (
    <div>
      {comment.text}
    </div>
  )
}

export default CommentCard;