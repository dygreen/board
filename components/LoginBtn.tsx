'use client';

import { signIn } from 'next-auth/react'

export default function LoginBtn() {
  return (
    <button type='button' onClick={() => signIn()} className='font-lg'>로그인</button>
  )
}