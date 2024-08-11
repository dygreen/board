import ArticleItem from '@components/ArticleItem'
import { ArticleItemFlag } from '@util/interface'

export default async function Home() {
    // 게시글 리스트 조회
    const getData = async () => {
        try {
            const res = await fetch(
                `${process.env.BASE_URL}/api/board/get-article`,
                {
                    cache: 'no-store',
                },
            )
            const data = await res.json()
            return data
        } catch (error) {
            console.error(error)
        }
    }

    const article: ArticleItemFlag[] = (await getData()) || []

    return <ArticleItem article={article} />
}
