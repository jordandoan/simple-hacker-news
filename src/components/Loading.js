import React from 'react';
import gif from '../images/Loading.gif';
import styles from './Loading.module.scss';
const Loading = (props) => {
  return (
    <span className={styles.loading} ><img className={styles.image} src={gif} alt="Spinning quail"/></span>
  )
}

export default Loading;