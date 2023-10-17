import React from 'react';
import Image from 'next/image';
import styles from './header.module.scss';
import Link from 'next/link';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1>
          <Link href="/">
            <Image 
              src={'/images/logo.png'}
              alt='logo'
              width={130}
              height={31}
            />
          </Link>
        </h1>

        <button type='button' className='font-lg'>
          로그인
        </button>
      </div>
    </header>
  );
}