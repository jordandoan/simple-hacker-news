import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div>
      <div>
        <h1>Simple Hacker News</h1>
        <h2>Share links with others</h2>
        <button><Link to="/preview">View posts</Link></button>
      </div>
    </div>
  )
}

export default LandingPage;