import Link from 'next/link'
import { ArticleItemFlag } from '@util/interface'
import { faPenToSquare } from '@node_modules/@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@node_modules/@fortawesome/react-fontawesome'
import DeleteBtn from '@components/board/DeleteBtn'
import { getServerSession } from '@node_modules/next-auth'
import { authOptions } from '@src/app/api/auth/[...nextauth]/route'

export default async function ArticleItem({
    articles,
}: {
    articles: ArticleItemFlag[]
}) {
    const session: any = await getServerSession(authOptions)

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
                        {session &&
                            (session.user.name === article.userName ||
                                session.user.name === 'Admin') && (
                                <>
                                    <Link
                                        href={`/modify/${article._id.toString()}`}
                                    >
                                        <FontAwesomeIcon
                                            icon={faPenToSquare}
                                            className="article-icon"
                                        />
                                    </Link>
                                    <DeleteBtn
                                        selected={article._id.toString()}
                                    />
                                </>
                            )}
                        {article.modDate && (
                            <span>편집됨 ({article.modDate})</span>
                        )}
                    </article>
                ))
            ) : (
                <h4>등록된 게시글이 없습니다.</h4>
            )}
        </div>
    )
}
