import { connectDB } from '@util/database'
import bcrypt from 'bcrypt'
import { NextRequest, NextResponse } from 'next/server'

async function signUp(req: NextRequest, res: NextResponse) {
    const db = (await connectDB).db('board')

    try {
        // Next.js App Router에서는 req.json()으로 요청 본문을 가져옵니다.
        const body = await req.json()

        // 중복된 이메일 체크 (유저가 보낸 이메일이 db에 있으면 회원가입 시켜주지 않게)
        let dupliUser = await db
            .collection('user_cred')
            .findOne({ email: body.email })

        if (dupliUser) {
            return NextResponse.json(
                { message: '이미 가입된 유저입니다.' },
                { status: 500 },
            )
        }

        // bcrypt : 비번 암호화 저장
        body.password = await bcrypt.hash(body.password, 10)
        body.role = 'normal'

        // 회원정보 보관
        await db.collection('user_cred').insertOne(body)

        return NextResponse.json({ message: '회원 가입 되었습니다.' })
    } catch (error) {
        return NextResponse.json(
            { message: '회원 가입 중 오류가 발생했습니다.' },
            { status: 500 },
        )
    }
}

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        return await signUp(req, res)
    } catch (e) {
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 },
        )
    }
}
