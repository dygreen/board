'use client'

import React from 'react'
import { Viewer } from '@toast-ui/react-editor'

export default function ToastViewer({ content }: { content: string }) {
    return <Viewer initialValue={content} />
}
