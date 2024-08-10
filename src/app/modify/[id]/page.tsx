import { connectDB } from "../../../../util/database";
import { ObjectId } from "mongodb";
import { notFound } from "next/navigation";
import FormArea from "../../../../components/FormArea";

export default async function Modify(props: any) {
  const db = (await connectDB).db('board');
  let result = await db.collection('article').findOne({_id : new ObjectId(props.params.id)});

  if (result === null) {
    notFound();
  }

  return (
    <FormArea isModify={true} result={result}/>
  )
}