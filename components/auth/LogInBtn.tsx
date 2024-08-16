'use client'

import { signIn } from 'next-auth/react'
import Link from 'next/link'
import styles from '@layout/Header/header.module.scss'

export default function LogInBtn() {
    return (
        <div>
            <button type="button" onClick={() => signIn()}>
                <span>로그인</span>
            </button>
            <Link href={'/register'} className={styles.register}>
                <span>회원가입</span>
            </Link>
        </div>
    )
}
