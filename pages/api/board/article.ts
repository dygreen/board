import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@util/database';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const db = (await connectDB).db('board');

  // GET : 게시글 조회
  if (req.method === 'GET') {
    let result = await db.collection('article').find().toArray();

    res.status(200).json(result);
  }

  // POST : 게시글 추가
  if (req.method === 'POST') {
    // 제목 / 내용 빈칸일 경우 에러
    if (req.body.title == '' || req.body.content == '') {
      return res.status(500).json('내용을 작성해주세요.')
    }

    // DB 에러 예외 처리
    try {
      const date = new Date();
      const item = {
        ...req.body,
        regDate: `${date.getFullYear()}.${date.getMonth()+1}.${date.getDate()}`,
        userName: 'test account'
      }

      await db.collection('article').insertOne(item);
      
      // 성공 시 메인 페이지로 이동
      return res.redirect(302, '/');
    } catch (error) {
      console.log(error);
    }
  }
}