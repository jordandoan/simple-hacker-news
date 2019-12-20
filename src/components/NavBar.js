import React from 'react'; 
import { NavLink } from 'react-router-dom';


const NavBar = () => {

  return (
    <div>
      <h1>Simple Hacker News</h1>
      <div>
        <NavLink to="/signup">Sign Up</NavLink>
        <NavLink to="/signin">Sign In</NavLink>
      </div>
    </div>
  )
}

export default NavBar;