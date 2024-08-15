'use client'

export default function FormArea({
    isModify,
    result,
}: {
    isModify: boolean
    result?: any
}) {
    return (
        <div>
            <h4>게시글 {isModify ? '수정' : '작성'}하기</h4>
            <form
                action={isModify ? '' : '/api/board/add-article'}
                method="POST"
            >
                {isModify && (
                    <input
                        type="hidden"
                        name="_id"
                        defaultValue={result?._id.toString()}
                    />
                )}
                <input
                    type="text"
                    name="title"
                    value={isModify ? result?.title : undefined}
                    placeholder="제목을 작성해주세요."
                />
                <input
                    type="text"
                    name="content"
                    value={isModify ? result?.content : undefined}
                    placeholder="내용을 작성해주세요."
                />
                <button type="submit">완료</button>
            </form>
        </div>
    )
}
