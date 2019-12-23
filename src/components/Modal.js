import React, { useEffect, useRef } from 'react';
import styles from './Modal.module.scss';

const Modal = ({open, setOpen, text, children}) => {
  const node = useRef();

  useEffect(() => {
    if (document.getElementById('overlay')) {
      if (open) {
        document.getElementById('overlay').style.display =
          'block';
      } else {
        document.getElementById('overlay').style.display =
          'none';
      }
    }
  }, [open]);
  
  return (
    <div>
      <button onClick={() => setOpen(!open)}>
        <p>{text}</p>
      </button>
    {open && (
      <div ref={node}>
        <div id="overlay" className={styles.overlay} onClick={() => setOpen(!open)}></div>
        <div className={styles.modal}>
          {children}
        </div>
      </div>
    ) }
  </div>
  )
}

export default Modal;