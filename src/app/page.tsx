import ArticleItem from '@components/ArticleItem'
import { ArticleItemFlag } from '@util/interface'

export default async function Home() {
    // 게시글 리스트 조회
    const getData = async () => {
        try {
            const res = await fetch('/api/board/get-article', {
                cache: 'no-store',
            })
            return await res.json()
        } catch (error) {
            console.error(error)
        }
    }

    const article: ArticleItemFlag[] = (await getData()) || []

    return <ArticleItem article={article} />
}
