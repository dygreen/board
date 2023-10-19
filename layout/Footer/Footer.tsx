import React from 'react';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <button type='button'>
          <FontAwesomeIcon icon={faPenToSquare} height={30}/>
        </button>
      </div>
    </footer>
  );
}