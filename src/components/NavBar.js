import React from 'react'; 
import { NavLink } from 'react-router-dom';


const NavBar = () => {

  return (
    <div>
      <NavLink to="/"><h1>Simple Hacker News</h1></NavLink>
      <div>
        <NavLink to="/signup">Sign Up</NavLink>
        <NavLink to="/signin">Sign In</NavLink>
      </div>
    </div>
  )
}

export default NavBar;