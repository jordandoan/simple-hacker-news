import React from 'react'; 
import { useClient, useApolloClient } from '@apollo/react-hooks';

import { NavLink } from 'react-router-dom';
const NavBar = ({ token, setToken, history }) => {
  const client = useApolloClient();

  const logout = () => {
    setToken('');
    localStorage.clear();
    client.clearStore();
  }

  return (
    <div>
      <NavLink to="/"><h1>Simple Hacker News</h1></NavLink>
      <div>
        {!token &&
          <>
            <NavLink to="/signup">Sign Up</NavLink>
            <NavLink to="/signin">Sign In</NavLink>
          </>
        }
        { token && 
          <button onClick={logout}>Log out</button>
        }
      </div>
    </div>
  )
}

export default NavBar;