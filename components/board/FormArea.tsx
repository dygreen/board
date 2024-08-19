'use client'

import { useRouter } from 'next/navigation'
import { ArticleItemFlag } from '@util/interface'
import React from 'react'
import { Button, TextField } from '@mui/material'
import '@style/form.scss'

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
            router.refresh()
        } else {
            alert(data.message || '알 수 없는 오류가 발생했습니다.')
        }
    }

    return (
        <div className="form-container">
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
                <TextField
                    id="outlined-basic"
                    label="title"
                    name="title"
                    variant="outlined"
                    defaultValue={isModify ? result?.title : undefined}
                    placeholder="제목을 작성해주세요."
                    size="small"
                />
                <TextField
                    id="outlined-basic"
                    label="content"
                    name="content"
                    variant="outlined"
                    defaultValue={isModify ? result?.content : undefined}
                    placeholder="내용을 작성해주세요."
                    size="small"
                />
                <Button variant="outlined" size="small" type="submit">
                    완료
                </Button>
            </form>
        </div>
    )
}
