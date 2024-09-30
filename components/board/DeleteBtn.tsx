'use client'

import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { sAlert } from '@util/sweetAlert'

export default function DeleteBtn({ selected }: { selected: string }) {
    const queryClient = useQueryClient()

    const { mutate: handleDeleteArticle } = useMutation({
        mutationFn: () =>
            fetch(`/api/board/delete-article?id=${selected}`, {
                method: 'DELETE',
            }),
        onSuccess: async (res) => {
            const data = await res.json()
            if (res.status === 200) {
                await sAlert.success({ text: data.message })
                await queryClient.invalidateQueries({ queryKey: ['articles'] })
            } else if (res.status === 500) {
                await sAlert.error({
                    text: data.message || '알 수 없는 오류가 발생했습니다.',
                })
            }
        },
        onError: (error) => {
            sAlert.error({ text: error.message })
        },
    })

    const handleClick = () => {
        sAlert.warning({
            text: '게시글을 삭제하시겠습니까?',
            preConfirm: handleDeleteArticle,
            showCancelButton: true,
        })
    }

    return (
        <button type="button" onClick={handleClick}>
            <FontAwesomeIcon icon={faTrash} className="article-icon" />
        </button>
    )
}
