import React from 'react';

export default function ArticleItem({article}: any) {
  return (
    <article>
      <p>
        {article.userName} <span>{article.regDate}</span>
      </p>
      <h3>{article.title}</h3>
      <h4>{article.content}</h4>
    </article>
  );
}