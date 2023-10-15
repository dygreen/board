import React from 'react';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Footer() {
  return (
    <footer>
      <FontAwesomeIcon icon={faPenToSquare} height={30}/>
    </footer>
  );
}