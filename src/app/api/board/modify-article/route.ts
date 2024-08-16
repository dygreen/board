import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@util/database'
import { getServerSession } from '@node_modules/next-auth'
import { authOptions } from '@src/app/api/auth/[...nextauth]/route'
import { ObjectId } from 'mongodb'

export async function POST(req: NextRequest) {
    const db = (await connectDB).db('board')
    const session: any = await getServerSession(authOptions)

    try {
        const formData = await req.formData()
        const title = formData.get('title')
        const content = formData.get('content')
        const regDate = formData.get('regDate')
        const _id = formData.get('_id')

        // 제목 / 내용 빈칸일 경우 에러
        if (!title || !content) {
            return NextResponse.json(
                { message: '내용을 작성해주세요.' },
                { status: 400 },
            )
        }

        // DB 에러 예외 처리
        const date = new Date()
        const item = {
            title,
            content,
            regDate,
            userName: session?.user?.name,
            modDate: `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`,
        }

        await db
            .collection('article')
            .updateOne({ _id: new ObjectId(_id as string) }, { $set: item })

        // 성공 시 메인 페이지로 이동
        return NextResponse.redirect(`${req.nextUrl.origin}/`, 302)
    } catch (e) {
        return NextResponse.json(
            { message: '게시글 수정 중 오류가 발생했습니다.' },
            { status: 500 },
        )
    }
}
