'use client'

import { useRouter } from 'next/navigation'
import { ArticleItemFlag } from '@util/interface'
import React, { useRef, useState } from 'react'
import { Button, TextField } from '@mui/material'
import '@style/form.scss'
import dynamic from 'next/dynamic'

const ToastEditor = dynamic(() => import('@components/editor/ToastEditor'), {
    ssr: false,
})

export default function FormArea({ result }: { result?: ArticleItemFlag }) {
    const [content, setContent] = useState(result?.content || null)
    const editorRef = useRef(null)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        formData.append('content', content || '')

        const url = result
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

    const handleSetContent = (data: any) => {
        setContent(data)
    }

    return (
        <div className="form-container">
            <h4>게시글 {result ? '수정' : '작성'}하기</h4>
            <form onSubmit={handleSubmit}>
                {result && (
                    <>
                        <input
                            type="hidden"
                            name="_id"
                            defaultValue={result._id.toString()}
                        />
                        <input
                            type="hidden"
                            name="regDate"
                            defaultValue={result.regDate}
                        />
                        <input
                            type="hidden"
                            name="userName"
                            defaultValue={result.userName}
                        />
                        <input
                            type="hidden"
                            name="isBookmarked"
                            defaultValue={String(result.isBookmarked)}
                        />
                    </>
                )}
                <TextField
                    id="outlined-basic"
                    label="title"
                    name="title"
                    variant="outlined"
                    defaultValue={result?.title || undefined}
                    placeholder="제목을 작성해주세요."
                    size="small"
                    margin="normal"
                    fullWidth={true}
                />
                <ToastEditor
                    editorRef={editorRef}
                    onSetContent={handleSetContent}
                    initialValue={(result?.content as string) || ''}
                />
                <div className="submitBtn">
                    <Button variant="contained" size="small" type="submit">
                        완료
                    </Button>
                </div>
            </form>
        </div>
    )
}
