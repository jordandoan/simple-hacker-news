import React, {useState} from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

import Onboarding from './components/Onboarding';
import Add from './components/Add';
import LinkCard from './components/LinkCard';
import { GET_LINKS } from './components/Queries';

import './App.css';

function App() {
  const { loading, error, data } = useQuery(GET_LINKS, { pollInterval: 500 });
  const [token, setToken] = useState(localStorage.getItem('token'))
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const logout = () => {
    setToken('');
    localStorage.clear();
  }

  return (
    <div className="App">
      {!token && <Onboarding setToken={setToken}/>} 
      {token && <button onClick={logout}>Logout</button>}
      {
        token && 
        <div>
          <Add/> 
          <div className="links">
            {data.feed.links.map((link, index) => <LinkCard link={link} index={index}/>)}
          </div>
        </div>
      }
    </div>
  );
}

export default App;
