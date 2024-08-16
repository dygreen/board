'use client'

import { signOut } from 'next-auth/react'

export default function LogOutBtn() {
    return (
        <button type="button" onClick={() => signOut()}>
            <span>로그아웃</span>
        </button>
    )
}
