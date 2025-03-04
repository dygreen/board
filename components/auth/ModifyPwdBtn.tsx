'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

export default function ModifyPwdBtn() {
    const router = useRouter()

    const handleClick = () => router.push('/modify/password')

    return (
        <button
            type="button"
            className="bookmark-wrapper"
            onClick={handleClick}
        >
            <span>비밀번호 변경</span>
        </button>
    )
}
