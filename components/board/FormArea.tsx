'use client'

import { useRouter } from 'next/navigation'
import { ArticleItemFlag } from '@util/interface'
import React from 'react'

export default function FormArea({
    isModify,
    result,
}: {
    isModify: boolean
    result?: ArticleItemFlag
}) {
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const url = isModify
            ? '/api/board/modify-article'
            : '/api/board/add-article'

        const response = await fetch(url, {
            method: 'POST',
            body: formData,
        })

        const data = await response.json()

        if (response.ok) {
            alert(data.message)
            router.push('/')
        } else {
            alert(data.message || '알 수 없는 오류가 발생했습니다.')
        }
    }

    return (
        <div>
            <h4>게시글 {isModify ? '수정' : '작성'}하기</h4>
            <form onSubmit={handleSubmit}>
                {isModify && (
                    <>
                        <input
                            type="hidden"
                            name="_id"
                            defaultValue={result?._id.toString()}
                        />
                        <input
                            type="hidden"
                            name="regDate"
                            defaultValue={result?.regDate}
                        />
                        <input
                            type="hidden"
                            name="userName"
                            defaultValue={result?.userName}
                        />
                    </>
                )}
                <input
                    type="text"
                    name="title"
                    defaultValue={isModify ? result?.title : undefined}
                    placeholder="제목을 작성해주세요."
                />
                <input
                    type="text"
                    name="content"
                    defaultValue={isModify ? result?.content : undefined}
                    placeholder="내용을 작성해주세요."
                />
                <button type="submit">완료</button>
            </form>
        </div>
    )
}
