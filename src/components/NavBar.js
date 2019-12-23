import React from 'react'; 
import { useApolloClient } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';

import { NavLink } from 'react-router-dom';
const NavBar = ({ token, setToken }) => {
  const client = useApolloClient();
  const history = useHistory();
  
  const logout = () => {
    setToken('');
    localStorage.clear();
    client.clearStore();
    history.push('/');
  }
  console.log(token);
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