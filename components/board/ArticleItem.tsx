import Link from 'next/link'
import { ArticleItemFlag } from '@util/interface'
import DeleteBtn from '@components/board/DeleteBtn'
import { authOptions } from '@src/app/api/auth/[...nextauth]/route'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { getServerSession } from 'next-auth'
import BookmarkBtn from '@components/board/BookmarkBtn'
import dynamic from '@node_modules/next/dynamic'

const ToastViewer = dynamic(() => import('@components/editor/ToastViewer'), {
    ssr: false,
})

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
                        <div className="top-content">
                            <span>{article.userName}</span>
                            <span>{article.regDate}</span>
                        </div>
                        <BookmarkBtn
                            selected={article._id.toString()}
                            bookmarked={article.isBookmarked ?? false}
                            isAuthorized={
                                !!(
                                    session &&
                                    (session.user.name === article.userName ||
                                        session.user.name === 'Admin')
                                )
                            }
                        />
                        <div className="middle-content">
                            <Link href={`/detail/${article._id.toString()}`}>
                                <h4>{article.title}</h4>
                            </Link>
                            <ToastViewer content={article.content} />
                        </div>
                        <div className="bottom-content">
                            {article.modDate && (
                                <div className="mod-box">
                                    <span>편집됨 ({article.modDate})</span>
                                </div>
                            )}
                            {session &&
                                (session.user.name === article.userName ||
                                    session.user.name === 'Admin') && (
                                    <div className="btn-box">
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
                                    </div>
                                )}
                        </div>
                    </article>
                ))
            ) : (
                <h4>등록된 게시글이 없습니다.</h4>
            )}
        </div>
    )
}
