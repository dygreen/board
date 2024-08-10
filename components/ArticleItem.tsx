import Link from 'next/link'
import { ArticleItemFlag } from '@util/interface'

export default async function ArticleItem({
    article,
}: {
    article: ArticleItemFlag[]
}) {
    return (
        <div className="article-container">
            {article.length > 0 ? (
                article.map((data: ArticleItemFlag) => (
                    <article key={data._id.toString()}>
                        <p>
                            {data.userName} <span>{data.regDate}</span>
                        </p>
                        <Link href={`/detail/${data._id.toString()}`}>
                            <h4>{data.title}</h4>
                        </Link>
                        <p>{data.content}</p>
                    </article>
                ))
            ) : (
                <h4>등록된 게시글이 없습니다.</h4>
            )}
        </div>
    )
}
