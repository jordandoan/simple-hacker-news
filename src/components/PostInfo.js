import React, { useState } from 'react';
import styles from './PostInfo.module.scss';
import { useMutation } from '@apollo/react-hooks';
import { DELETE } from './Mutations';
import { GET_LINKS } from './Queries';
import Modal from './Modal';

const PostInfo = ({ link, loggedIn, userId, children }) => {
  let [open, setOpen] = useState(false);
  let [deletePost, {loading: deletePostLoading} ] = useMutation(DELETE, {
    refetchQueries: GET_LINKS,
    update(cache, {data}) {
      const { feed } = cache.readQuery({ query: GET_LINKS });
      const newLinks = feed.links.filter(feedLink => feedLink.id !== link.id)
      cache.writeQuery({
        query: GET_LINKS,
        data: {feed: {...feed, links: newLinks}}
      })
    },
    onCompleted(data) {
      setOpen(false)
    }
  });

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
        {(userId === link.postedBy.id 
          ? <>
            <p>Edit</p>
            <Modal open={open} setOpen={setOpen} text="Delete Post">
              Are you sure you want to delete this post?
              <p onClick={() => deletePost({variables: {id: link.id}})}>Confirm</p>
              <p onClick={() => setOpen(false)}>Cancel</p>
            </Modal>
            </> 
        : "" )}
      </div>
    </div>



  </>)
}

export default PostInfo