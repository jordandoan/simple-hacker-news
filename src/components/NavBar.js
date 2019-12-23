import React from 'react'; 
import { useApolloClient } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';

import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.scss';

const NavBar = ({ token, setToken }) => {
  const client = useApolloClient();
  const history = useHistory();

  const logout = () => {
    setToken('');
    localStorage.clear();
    client.clearStore();
    history.push('/');
  }

  return (
    <div className={styles.navbar}>
      <NavLink className={styles.none} to="/"><h1>Simple Hacker News</h1></NavLink>
      <div className={styles.buttons}>
        {!token &&
          <>
            <NavLink className={styles.none} activeClassName={styles.active} to="/signup">Sign Up</NavLink>
            <NavLink className={styles.none} activeClassName={styles.active} to="/signin">Sign In</NavLink>
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