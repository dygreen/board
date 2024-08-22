import ArticleItem from '@components/board/ArticleItem'
import { connectDB } from '@util/database'
import { ArticleItemFlag } from '@util/interface'

export default async function Home() {
    const db = (await connectDB).db('board')
    const articles = await db
        .collection<ArticleItemFlag>('article')
        .find()
        .sort('regDate', 'desc')
        .toArray()

    return <ArticleItem articles={articles} />
}
