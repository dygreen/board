import { connectDB } from '@util/database'
import { ObjectId } from 'mongodb'
import { notFound } from 'next/navigation'
import FormArea from '@components/board/FormArea'

export default async function Modify({ params }: { params: { id: string } }) {
    const db = (await connectDB).db('board')
    let result = await db
        .collection('article')
        .findOne({ _id: new ObjectId(params.id) })

    if (result === null) {
        notFound()
    }

    return <FormArea isModify={true} result={result} />
}
