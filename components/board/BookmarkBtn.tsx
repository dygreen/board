'use client'

import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbTack } from '@fortawesome/free-solid-svg-icons'

export default function BookmarkBtn() {
    return (
        <div className="bookmark-wrapper">
            <FontAwesomeIcon icon={faThumbTack} className="article-icon" />
        </div>
    )
}
