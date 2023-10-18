'use client';

import React, { useEffect, useState } from 'react';
import { ArticleItemFlag } from '../util/interface';

export default function ArticleItem() {
  const [article, setArticle] = useState<ArticleItemFlag[]>([]);

  // 게시글 리스트 조회
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/board/article', { method: 'GET' });
        if (res.status === 200) {
          const data = await res.json();
          setArticle(data);
        };
      } catch (error) {
        console.warn(error);
      }
    })();
  },[])

  return (
    <div className='article-container'>
      {
        article.length > 0 ?
        article.map(data => (
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