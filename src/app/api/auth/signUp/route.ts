import { connectDB } from '@util/database'
import bcrypt from 'bcrypt'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    const db = (await connectDB).db('board')

    try {
        const body = await req.json()

        if (body.name === 'Admin') {
            return NextResponse.json(
                { message: '관리자 계정은 등록할 수 없습니다.' },
                { status: 500 },
            )
        }

        // 중복된 이메일 체크 (유저가 보낸 이메일이 db에 있으면 회원가입 시켜주지 않게)
        let dupliUser =
            (await db.collection('user_cred').findOne({ email: body.email })) ||
            (await db.collection('user_cred').findOne({ email: body.name }))

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
