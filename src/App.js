import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import Onboarding from './components/Onboarding';
import Add from './components/Add';
import LinkCard from './components/LinkCard';
import LandingPage from './components/LandingPage';
import Feed from './components/Feed';

import './App.scss';
import NavBar from './components/NavBar';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'))
  // const [getUser, {data: userData}] = useLazyQuery(GET_USER);
  // const logout = () => {
  //   setToken('');
  //   localStorage.clear();
  //   client.clearStore();
  // }

  return (
    <div className="App">
      <NavBar token={token} setToken={setToken}/>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/preview" render={() => <Feed preview={true}/>} />
      <Route path={["/signup", "/signin"]} render={() => <Onboarding token={token} setToken={setToken} />} />
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
