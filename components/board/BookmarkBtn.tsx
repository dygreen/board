'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbTack } from '@fortawesome/free-solid-svg-icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { signIn } from 'next-auth/react'
import { sAlert } from '@util/sweetAlert'

export default function BookmarkBtn({
    selected,
    bookmarked,
    isAuthorized,
}: {
    selected: string
    bookmarked: boolean
    isAuthorized: boolean
}) {
    const queryClient = useQueryClient()

    const { mutate: handleBookmarkArticle } = useMutation({
        mutationFn: () =>
            fetch('/api/board/bookmark-article', {
                method: 'POST',
                body: JSON.stringify({
                    id: selected,
                    isBookmarked: !bookmarked,
                }),
            }),
        onSuccess: async (res) => {
            const data = await res.json()
            if (res.status === 200) {
                await queryClient.invalidateQueries({ queryKey: ['articles'] })
            } else if (res.status === 500) {
                await sAlert.error({
                    text: data.message || '알 수 없는 오류가 발생했습니다.',
                })
            }
        },
        onError: (error) => {
            sAlert.error({
                text: error.message,
            })
        },
    })

    const handleClick = () => {
        if (!isAuthorized) {
            sAlert.error({
                html: '북마크 체크 권한이 없습니다.<br/>로그인 후 이용해주세요.',
                preConfirm: signIn,
                showCancelButton: true,
            })
            return
        }

        handleBookmarkArticle()
    }

    return (
        <button
            type="button"
            className="bookmark-wrapper"
            onClick={handleClick}
        >
            <FontAwesomeIcon
                icon={faThumbTack}
                className={`article-icon ${bookmarked && 'bookmarked'}`}
            />
        </button>
    )
}
