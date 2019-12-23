import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';

import PostInfo from './PostInfo';
import UserFeed from './UserFeed';

import { GET_LINKS, GET_USER } from './Queries';

const Feed = ({ preview, history }) => {
  useEffect(() => {
    if (!localStorage.getItem('token') && !preview) history.push('/');
    if (localStorage.getItem('token') && preview) history.push('/feed');
  }, [])
  
  const { loading, data } = useQuery(GET_LINKS);
  if (loading) return <p>Loading...</p>;
  return (
    <div>
      {data && preview && 
      <div className="links">
        {data.feed.links.map(link => <div className={"link-container"}><PostInfo link={link} loggedIn={false}/></div>)}
      </div>
      }
      {data && !preview &&
        <div>
          <UserFeed feed={data.feed} />
        </div>
      }
    </div>
  )
}

export default Feed;