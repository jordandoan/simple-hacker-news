import React, {useState} from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

import Onboarding from './components/Onboarding';
import Add from './components/Add';

import './App.css';

const GET_LINKS = gql`
query GetLinks {
  feed {
    links {
      description
      url
    }
  }
}
`

function App() {
  const { loading, error, data } = useQuery(GET_LINKS);
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
            {data.feed.links.map(link => <div className="link-container"><p>{link.url}</p><p>{link.description}</p></div>)}
          </div>
        </div>
      }
    </div>
  );
}

export default App;
