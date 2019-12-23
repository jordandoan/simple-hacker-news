import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';

import PostInfo from './PostInfo';
import { GET_LINKS } from './Queries';

const Feed = ({ preview, history }) => {

  useEffect(() => {
    if (!localStorage.getItem('token') && !preview) history.push('/');
  }, [])
  
  const { client, loading, error, data } = useQuery(GET_LINKS);
  if (loading) return <p>Loading...</p>;
  return (
    <div>
      {data && preview && 
      <div className="links">
        {data.feed.links.map((link, index) => <div className={"link-container"}><PostInfo link={link} loggedIn={false}/></div>)}
      </div>
      }
      {!preview &&
        <div>You are logged in</div>
      }
    </div>
  )
}

export default Feed;