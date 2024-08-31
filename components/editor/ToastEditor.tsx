'use client'

import React from 'react'
import { Editor } from '@toast-ui/react-editor'
import Prism from 'prismjs'
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight'
import colorSyntax from '@toast-ui/editor-plugin-color-syntax'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css'
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css'
import 'tui-color-picker/dist/tui-color-picker.css'

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
        const content = editorInstance.getMarkdown()

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
            height="450px"
            initialEditType="markdown"
            previewStyle="vertical"
            usageStatistics={false}
            initialValue={initialValue}
            onChange={handleGetHTML}
            plugins={[
                colorSyntax,
                [codeSyntaxHighlight, { highlighter: Prism }],
            ]}
        />
    )
}
