import React from 'react';

const PostInfo = ({ link, loggedIn }) => {
  return (
  <>
    <p>{link.url}</p>
    <p>{link.description}</p>
    <p>Posted by: {link.postedBy.name}</p>
    {(loggedIn ? <p>

          {/* <p className={"vote-button" + " " + (voted ? "liked" : "")} onClick={handleVote}> {(voted) ? 'Liked' : 'Like' } {count}</p>
    {link.postedBy.id == user.id  && 
      <>
        <button onClick={() => handleDelete()}>Delete</button>
        <button onClick={() => setForm(true)}>Edit</button>
      </>} */}
    </p> : <p> {link.count} likes</p>)}

  </>)
}

export default PostInfo