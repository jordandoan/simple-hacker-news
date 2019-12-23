import React from 'react';

const PostInfo = ({ link, loggedIn, children }) => {
  
  return (
  <>
    <p>{link.url}</p>
    <p>{link.description}</p>
    <p>Posted by: {link.postedBy.name}</p>
    {(loggedIn ? <div className="test">
      {children}
      </div>
    : <p> {link.count} likes</p>)}

  </>)
}

export default PostInfo