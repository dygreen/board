'use client'

import React from 'react'
import { Viewer } from '@toast-ui/react-editor'
import '@toast-ui/editor/dist/toastui-editor-viewer.css'

export default function ToastViewer({ content }: { content: string }) {
    return <Viewer initialValue={content} />
}
