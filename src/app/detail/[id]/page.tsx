import { connectDB } from '@util/database'
import { ObjectId } from 'mongodb'
import { notFound } from 'next/navigation'

export default async function Detail({ params }: { params: { id: string } }) {
    const db = (await connectDB).db('board')
    // findOne : 하나의 게시글 찾기
    let result = await db
        .collection('article')
        .findOne({ _id: new ObjectId(params.id) })

    if (result === null) {
        notFound()
    }

    return (
        <div>
            <p>
                {result.userName} <span>{result.regDate}</span>
            </p>
            <h4>{result.title}</h4>
            <p>{result.content}</p>
        </div>
    )
}
