import React from 'react';
import styles from './PostInfo.module.scss';
const PostInfo = ({ link, loggedIn, children }) => {
  
  return (
  <>
    <div className={styles.body}>
      <p>{link.url}</p>
      <p>{link.description}</p>
    </div>
    <p>Posted by: {link.postedBy.name}</p>
    {(loggedIn ? <div className="test">
      {children}
      </div>
    : <p> {link.count} likes</p>)}

  </>)
}

export default PostInfo