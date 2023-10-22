'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import styles from '../layout/Header/header.module.scss';

export default function LoginBtn() {
  return (
    <div>
      <button type='button' onClick={() => signIn()}>로그인</button>
      <Link href={'/register'} className={styles.register}>회원가입</Link>
    </div>
  )
}