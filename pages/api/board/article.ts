import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../../util/database';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // GET : 게시글 조회
  if (req.method === 'GET') {
    const db = (await connectDB).db('board');
    let result = await db.collection('article').find().toArray();

    res.status(200).json(result);
  }
}