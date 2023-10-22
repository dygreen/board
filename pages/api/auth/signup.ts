import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "../../../util/database";
import bcrypt from 'bcrypt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == 'POST') {
    const db = (await connectDB).db('board');

    req.body = JSON.parse(req.body);

    // 중복된 이메일 체크 (유저가 보낸 이메일이 db에 있으면 회원가입 시켜주지 않게)
    let dupliUser = await db.collection('user_cred').findOne({ email : req.body.email });

    if (dupliUser) {
      res.status(500).json('이미 가입된 유저입니다.');
    } else {
      try {
        // bcrypt : 비번 암호화 저장
        let hash = await bcrypt.hash(req.body.password, 10);
        req.body.password = hash;
        req.body.role = 'normal';

        // 회원정보 보관
        await db.collection('user_cred').insertOne(req.body);

        res.status(200).json('회원 가입 되었습니다.');
      } catch (error) {
        console.log(error);
      }
    }
  }
}