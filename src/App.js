import React, { useState, useEffect } from 'react';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import { Route } from 'react-router-dom';
import Onboarding from './components/Onboarding';
import Add from './components/Add';
import LinkCard from './components/LinkCard';
import LandingPage from './components/LandingPage';
import Feed from './components/Feed';
import { GET_LINKS, GET_USER } from './components/Queries';

import './App.scss';
import NavBar from './components/NavBar';

function App() {
  // const [token, setToken] = useState(localStorage.getItem('token'))
  // const [getUser, {data: userData}] = useLazyQuery(GET_USER);
  // useEffect(() => {
  //   if (token) {
  //     getUser();
  //   }
  // }, [token])

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error :(</p>;

  // const logout = () => {
  //   setToken('');
  //   localStorage.clear();
  //   client.clearStore();
  // }

  return (
    <div className="App">
      <NavBar />
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/preview" render={() => <Feed preview={true}/>} />
      {/* {!token && <Onboarding setToken={setToken}/>} 
      {token && <button onClick={logout}>Logout</button>}
      {
        token && userData && 
        <div>
          <Add/> 

        </div>
      } */}
    </div>
  );
}

export default App;
