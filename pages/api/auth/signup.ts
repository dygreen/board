import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "../../../util/database";
import bcrypt from 'bcrypt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == 'POST') {
    const db = (await connectDB).db('board');

    // 빈칸 / 긴 비밀번호 체크
    if (req.body.password == '' || req.body.password.length > 11) {
      return res.status(500).json('비밀번호 형식을 체크해주세요 (빈칸/11자 이하 불가).')
    }

    // 중복된 이메일 체크 (유저가 보낸 이메일이 db에 있으면 회원가입 시켜주지 않게)
    let dupliUser = await db.collection('user_cred').findOne({ email : req.body.email });
    
    if (dupliUser) {
      res.status(500).json('이미 가입된 유저입니다.')
    } else {
      try {
        // bcrypt : 비번 암호화 저장
        let hash = await bcrypt.hash(req.body.password, 10);
        req.body.password = hash;
        req.body.role = 'normal';

        // 회원정보 보관
        await db.collection('user_cred').insertOne(req.body);

        return res.redirect(302, '/');
      } catch (error) {
        console.log(error)
      }
    }
  }
}