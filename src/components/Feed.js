import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import PostInfo from './PostInfo';
import { GET_LINKS } from './Queries';
const Feed = ({ preview }) => {
  const { client, loading, error, data } = useQuery(GET_LINKS);
  return (
    <div>
      {data &&
      <div className="links">
        {data.feed.links.map((link, index) => <div className={"link-container"}><PostInfo link={link} loggedIn={false}/></div>)}
      </div>
      }
    </div>
  )
}

export default Feed;