import React from 'react'
import Image from 'next/image'
import styles from './header.module.scss'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@src/app/api/auth/[...nextauth]/route'
import LogOutBtn from '@components/auth/LogOutBtn'
import LogInBtn from '@components/auth/LogInBtn'

export default async function Header() {
    // server component 에서 로그인된 유저 정보 출력
    const session: any = await getServerSession(authOptions)

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <h1>
                    <Link href="/">
                        <Image
                            src={'/images/logo.png'}
                            alt="logo"
                            width={130}
                            height={31}
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
