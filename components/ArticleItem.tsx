import Link from 'next/link'
import { ArticleItemFlag } from '@util/interface'

export default async function ArticleItem({
    articles,
}: {
    articles: ArticleItemFlag[]
}) {
    return (
        <div className="article-container">
            {articles.length > 0 ? (
                articles.map((article: ArticleItemFlag) => (
                    <article key={article._id.toString()}>
                        <p>
                            {article.userName} <span>{article.regDate}</span>
                        </p>
                        <Link href={`/detail/${article._id.toString()}`}>
                            <h4>{article.title}</h4>
                        </Link>
                        <p>{article.content}</p>
                    </article>
                ))
            ) : (
                <h4>등록된 게시글이 없습니다.</h4>
            )}
        </div>
    )
}
