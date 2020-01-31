import React from 'react';
import { useHistory } from 'react-router-dom';

import styles from './PostInfo.module.scss';
const PostInfo = ({ link, loggedIn, children }) => {
  const history = useHistory();
  return (
  <>
    {(loggedIn ? <div className="test">
      {children}
      </div>
    : <p> {link.count} likes</p>)}
    <div className={styles.container}>
      <div className={styles.body}  onClick={() => history.push(`/feed/${link.id}`)}>
        <p>{link.url}</p>
        <p>{link.description}</p>
      </div>
      <p>Posted by: {link.postedBy.name} / {link.comment_count} comments</p>
    </div>



  </>)
}

export default PostInfo