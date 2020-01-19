import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import {  GET_USER } from './Queries';
import LinkCard from './LinkCard';
import Modal from './Modal';
import Add from './Add';

const UserFeed = (props) => {
  let { data } = useQuery(GET_USER);
  let [open, setOpen] = useState(false);
  if (!data) return <p>Loading user...</p>

  return (
    <div>
      { data && <h2>Greetings, {data.me.name}</h2>}
      <Modal open={open} setOpen={setOpen} text="Submit link">
        <Add setOpen={setOpen} />
      </Modal>
      <div className="links">
        {props.feed.links.map((link, index) => <LinkCard index={index} link={link} userId={data.me.id}/>)}
      </div>
    </div>
  )
}

export default UserFeed;