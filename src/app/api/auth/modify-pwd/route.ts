import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@util/database'
import { getServerSession } from 'next-auth'
import { authOptions } from '@src/app/api/auth/[...nextauth]/route'
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
    const db = (await connectDB).db('board')
    const session: any = await getServerSession(authOptions)

    try {
        const { currentPassword, newPassword } = await req.json()

        const user = await db
            .collection('user_cred')
            .findOne({ email: session.user.email })

        // 해당 이메일의 사용자 정보 조회
        if (!user) {
            return NextResponse.json(
                { message: '사용자를 찾을 수 없습니다.' },
                { status: 400 },
            )
        }

        // 현재 비밀번호 검증
        const isMatch = await bcrypt.compare(currentPassword, user.password)
        if (!isMatch) {
            return NextResponse.json(
                { message: '현재 비밀번호가 일치하지 않습니다.' },
                { status: 400 },
            )
        }

        // 새로운 비밀번호 해싱
        const hashedNewPassword = await bcrypt.hash(newPassword, 10)
        const result = await db
            .collection('user_cred')
            .updateOne(
                { email: session.user.email },
                { $set: { password: hashedNewPassword } },
            )

        if (result.modifiedCount === 0) {
            return NextResponse.json(
                { message: '비밀번호 업데이트에 실패했습니다.' },
                { status: 400 },
            )
        }

        return NextResponse.json({
            message: '비밀번호가 성공적으로 변경되었습니다.',
        })
    } catch (e) {
        return NextResponse.json(
            { message: '비밀번호 수정 중 오류가 발생했습니다.' },
            { status: 500 },
        )
    }
}
