import React from 'react';
import { Link } from 'react-router-dom';

import styles from './LandingPage.module.scss';

const LandingPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.jumbotron}>
        <h1>Simple Hacker News</h1>
        <h2>Share links with others</h2>
        <button className={styles.button}><Link to="/preview" className={styles.none}>View posts</Link></button>
      </div>
    </div>
  )
}

export default LandingPage;