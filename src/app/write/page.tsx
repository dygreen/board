'use client'

export default function Write() {
    return (
        <div>
            <h4>게시글 작성하기</h4>

            <form action="/api/board/add-article" method="POST">
                <input
                    type="text"
                    name="title"
                    placeholder="제목을 작성해주세요."
                />
                <input
                    type="text"
                    name="content"
                    placeholder="내용을 작성해주세요."
                />
                <button type="submit">완료</button>
            </form>
        </div>
    )
}
