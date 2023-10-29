import { ArticleItemFlag } from '../util/interface';

export default async function ArticleItem({article}: any) {
  return (
    <div className='article-container'>
      {
        article.length > 0 ?
        article.map((data: ArticleItemFlag) => (
          <article key={data._id.toString()}>
            <h4>{data.userName} <span>{data.regDate}</span></h4>
            <p>{data.title}</p>
            <p>{data.content}</p>
          </article>
        )) :
        <h4>등록된 게시글이 없습니다.</h4>
      }
    </div>
  );
}