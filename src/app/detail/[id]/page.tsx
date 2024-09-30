import { connectDB } from '@util/database'
import { ObjectId } from 'mongodb'
import { notFound } from 'next/navigation'
import styles from '@src/app/detail/[id]/detail.module.scss'
import dynamic from 'next/dynamic'

const ToastViewer = dynamic(() => import('@components/editor/ToastViewer'), {
    ssr: false,
})

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
        <div className={styles.article_container}>
            <div className={styles.top_content}>
                <span>{result.userName}</span>
                <span>{result.regDate}</span>
            </div>
            <div className={styles.bottom_content}>
                <h4>{result.title}</h4>
                <ToastViewer content={result.content} />
            </div>
        </div>
    )
}
