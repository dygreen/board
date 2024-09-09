import { connectDB } from '@util/database'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@src/app/api/auth/[...nextauth]/route'
import { CURR_DATE_FORMAT } from '@util/constant'

export async function POST(req: NextRequest) {
    const db = (await connectDB).db('board')
    const session: any = await getServerSession(authOptions)

    try {
        const formData = await req.formData()
        const title = formData.get('title')
        const content = formData.get('content')

        // 제목 / 내용 빈칸일 경우 에러
        if (!title || !content) {
            return NextResponse.json(
                { message: '내용을 작성해주세요.' },
                { status: 400 },
            )
        }

        const item = {
            title,
            content,
            regDate: CURR_DATE_FORMAT,
            userName: session?.user?.name,
            isBookmarked: false,
        }

        await db.collection('article').insertOne(item)

        // 성공 시 메인 페이지로 이동
        return NextResponse.json({
            message: '게시글이 성공적으로 등록되었습니다.',
        })
    } catch (e) {
        return NextResponse.json(
            { message: '게시글 작성 중 오류가 발생했습니다.' },
            { status: 500 },
        )
    }
}
