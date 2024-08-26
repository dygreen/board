'use client'

import React from 'react'
import { Editor } from '@toast-ui/react-editor'
import '@toast-ui/editor/dist/toastui-editor.css'

export default function ToastEditor({
    editorRef,
    onSetContent,
    initialValue,
}: {
    editorRef: React.RefObject<Editor>
    onSetContent: (data: any) => void
    initialValue: string
}) {
    const handleGetHTML = () => {
        const editorInstance = editorRef.current?.getInstance()
        const content = editorInstance.getHTML()

        onSetContent(content)
    }

    return (
        <Editor
            toolbarItems={[
                ['heading', 'bold', 'italic', 'strike'],
                ['hr', 'quote'],
                ['ul', 'ol', 'task', 'indent', 'outdent'],
                ['table', 'link'],
                ['code', 'codeblock'],
            ]}
            ref={editorRef}
            height="500px"
            initialEditType="markdown"
            previewStyle="vertical"
            usageStatistics={false}
            initialValue={initialValue}
            onChange={handleGetHTML}
        />
    )
}
