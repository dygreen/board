import { connectDB } from "../../util/database"
import ArticleItem from "../../components/ArticleItem";

export default async function Home() {
  const db = (await connectDB).db('board');
  let result = await db.collection('article').find().toArray();

  return (
    <>
      {
        result.map(article => (
          <ArticleItem key={article._id.toString()} article={article}/>
        ))
      }
    </>
  )
}