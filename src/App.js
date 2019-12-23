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

  return (
    <div className="App">
      <NavBar token={token} setToken={setToken}/>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/preview" render={(props) => <Feed {...props} preview={true}/>} />
      <Route exact path ="/feed" render={(props) => <Feed {...props} preview={false}/> } />
      <Route path={["/signup", "/signin"]} render={(props) => <Onboarding {...props} token={token} setToken={setToken} />} />
    </div>
  );
}

export default App;
