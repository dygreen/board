import ArticleItem from "../../components/ArticleItem";
import { ArticleItemFlag } from "../../util/interface";

export default async function Home() {
  // 게시글 리스트 조회
  const getData = async () => {
    try {
      const res =  await fetch(`${process.env.BASE_URL}/api/board/article`, { method: 'GET', cache: 'no-store' });
      if (res.status === 200) {
        return res.json();
      }
    } catch (error) {
      console.warn(error);
    }
  }
  
  const article: ArticleItemFlag[] = await getData();

  return (
    <ArticleItem article={article}/>
  )
}