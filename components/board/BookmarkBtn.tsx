'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbTack } from '@fortawesome/free-solid-svg-icons'

export default function BookmarkBtn({
    selected,
    bookmarked,
    isAuthorized,
}: {
    selected: string
    bookmarked: boolean
    isAuthorized: boolean
}) {
    const handleBookmarkArticle = async () => {
        if (!isAuthorized) {
            alert('북마크 체크 권한이 없습니다. 로그인 후 이용해주세요.')
            return
        }

        try {
            const response = await fetch('/api/board/bookmark-article', {
                method: 'POST',
                body: JSON.stringify({
                    id: selected,
                    isBookmarked: !bookmarked,
                }),
            })
            const data = await response.json()

            if (response.status === 200) {
                window.location.reload()
            } else if (response.status === 500) {
                alert(data.message)
            }
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <button
            type="button"
            className="bookmark-wrapper"
            onClick={handleBookmarkArticle}
        >
            <FontAwesomeIcon
                icon={faThumbTack}
                className={`article-icon ${bookmarked && 'bookmarked'}`}
            />
        </button>
    )
}
