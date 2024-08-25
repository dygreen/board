import React from 'react'
import Image from 'next/image'

export default function Loading() {
    return (
        <div className="loading-container">
            <Image
                src="/images/spinner.gif"
                alt="로딩중"
                width={100}
                height={100}
            />
            <div className="loading-text">
                <h4>처리 중입니다.</h4>
                <span>잠시만 기다려주세요.</span>
            </div>
        </div>
    )
}
