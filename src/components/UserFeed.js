import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import {  GET_USER } from './Queries';
import LinkCard from './LinkCard';

const UserFeed = (props) => {
  let { data } = useQuery(GET_USER);
  if (!data) return <p>Loading user...</p>

  return (
    <div>
      { data && <h2>Greetings, {data.me.name}</h2>}
      <div className="links">
        {props.feed.links.map((link, index) => <LinkCard index={index} link={link} userId={data.me.id}/>)}
      </div>
    </div>
  )
}

export default UserFeed;