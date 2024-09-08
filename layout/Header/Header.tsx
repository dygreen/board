'use client'

import React from 'react'
import Image from 'next/image'
import styles from './header.module.scss'
import Link from 'next/link'
import LogOutBtn from '@components/auth/LogOutBtn'
import LogInBtn from '@components/auth/LogInBtn'
import { useSession } from 'next-auth/react'

export default function Header() {
    const { data: session } = useSession()

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <h1>
                    <Link href="/">
                        <Image
                            src={'/images/logo.png'}
                            alt="logo"
                            width={95}
                            height={23}
                        />
                    </Link>
                </h1>

                {/* 로그인 버튼 영역 */}
                {session ? (
                    <div>
                        <span>{session?.user?.name}</span>
                        <LogOutBtn />
                    </div>
                ) : (
                    <LogInBtn />
                )}
            </div>
        </header>
    )
}
