import React from 'react'
import Image from 'next/image'
import spinner from '@public/images/spinner.gif'

export default function Loading() {
    return (
        <div className="loading-container">
            <Image src={spinner} alt="로딩중" />
            <div className="loading-text">
                <h4>처리 중입니다.</h4>
                <span>잠시만 기다려주세요.</span>
            </div>
        </div>
    )
}