'use client'

import React from 'react'
import { FontAwesomeIcon } from '@node_modules/@fortawesome/react-fontawesome'
import { faTrash } from '@node_modules/@fortawesome/free-solid-svg-icons'

export default function DeleteBtn({ selected }: { selected: string }) {
    const handleDeleteArticle = async () => {
        try {
            const response = await fetch(
                `/api/board/delete-article?id=${selected}`,
                {
                    method: 'DELETE',
                },
            )
            const data = await response.json()

            if (response.status === 200) {
                alert(data.message)
                window.location.reload()
            } else if (response.status === 500) {
                alert(data.message)
            }
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <button type="button" onClick={handleDeleteArticle}>
            <FontAwesomeIcon icon={faTrash} className="article-icon" />
        </button>
    )
}
