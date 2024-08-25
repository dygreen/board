'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbTack } from '@fortawesome/free-solid-svg-icons'

export default function BookmarkBtn({
    selected,
    bookmarked,
}: {
    selected: string
    bookmarked: boolean
}) {
    const handleBookmarkArticle = async () => {
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
        <div className="bookmark-wrapper" onClick={handleBookmarkArticle}>
            <FontAwesomeIcon
                icon={faThumbTack}
                className={`article-icon ${bookmarked && 'bookmarked'}`}
            />
        </div>
    )
}