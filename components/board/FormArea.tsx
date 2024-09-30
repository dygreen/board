'use client'

import { useRouter } from 'next/navigation'
import { ArticleItemFlag } from '@util/interface'
import React, { useRef, useState } from 'react'
import { Button, TextField } from '@mui/material'
import '@style/form.scss'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import ToastEditor from '@components/editor/ToastEditor'
import { sAlert } from '@util/sweetAlert'

export default function FormArea({ result }: { result?: ArticleItemFlag }) {
    const [content, setContent] = useState(result?.content || null)
    const editorRef = useRef(null)
    const router = useRouter()
    const queryClient = useQueryClient()

    const { mutate: handleFormArticle } = useMutation({
        mutationFn: (newData: FormData) =>
            fetch(
                result ? '/api/board/modify-article' : '/api/board/add-article',
                {
                    method: 'POST',
                    body: newData,
                },
            ),
        onSuccess: async (res) => {
            const data = await res.json()
            if (res.status === 200) {
                await sAlert.success({ text: data.message })
                await queryClient.invalidateQueries({ queryKey: ['articles'] })
                router.push('/')
            } else if (res.status === 400) {
                await sAlert.error({
                    text: data.message || '알 수 없는 오류가 발생했습니다.',
                })
            }
        },
        onError: (error) => {
            sAlert.error({ text: error.message })
        },
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        formData.append('content', content || '')

        await sAlert.warning({
            text: `게시글을 ${result ? '수정' : '등록'}하시겠습니까?`,
            preConfirm: () => handleFormArticle(formData),
            showCancelButton: true,
        })
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
