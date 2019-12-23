import React, { useEffect, useRef } from 'react';
import styles from './Modal.module.scss';

const Modal = ({open, setOpen, children}) => {
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
    <div className='coach-card-modal-text'>
      <button className='coach-card-modal-text' onClick={() => setOpen(!open)}>
        <p className='coach-card-modal-text coachcard-seemore'>See more </p>
      </button>
    {open && (
      <div ref={node}>
        <div id="overlay" className={styles.overlay} onClick={() => setOpen(!open)}></div>
        {children}
      </div>
    ) }
  </div>
  )
}

export default Modal;