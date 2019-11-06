import React, { useState, useEffect } from 'react';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';

import Onboarding from './components/Onboarding';
import Add from './components/Add';
import LinkCard from './components/LinkCard';
import { GET_LINKS, GET_USER } from './components/Queries';

import './App.css';

function App() {
  const { client, loading, error, data } = useQuery(GET_LINKS, { pollInterval: 500 });
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [getUser, {data: userData}] = useLazyQuery(GET_USER);
  useEffect(() => {
    if (token) {
      getUser();
    }
  }, [token])
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const logout = () => {
    setToken('');
    localStorage.clear();
    client.resetStore();
  }

  return (
    <div className="App">
      {!token && <Onboarding setToken={setToken}/>} 
      {token && <button onClick={logout}>Logout</button>}
      {
        token && userData && 
        <div>
          <Add/> 
          <div className="links">
            {data.feed.links.map((link, index) => <LinkCard user={userData.me} link={link} index={index}/>)}
          </div>
        </div>
      }
    </div>
  );
}

export default App;
