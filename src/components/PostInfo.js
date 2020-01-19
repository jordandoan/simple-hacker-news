import React from 'react';
import styles from './PostInfo.module.scss';
const PostInfo = ({ link, loggedIn, userId, children }) => {
  return (
  <>
    {(loggedIn ? <div className="test">
      {children}
      </div>
    : <p> {link.count} likes</p>)}
    <div className={styles.container}>
      <div className={styles.body}>
      <p>{link.url}</p>
      <p>{link.description}</p>
      </div>
      <div className={styles.meta}>
        <p>Posted by {link.postedBy.name}</p>
        {(userId === link.postedBy.id ? <><p>Edit</p><p>Delete</p></> : "" )}
      </div>
    </div>



  </>)
}

export default PostInfo