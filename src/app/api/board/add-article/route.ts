import { connectDB } from '@util/database'
import { NextResponse } from 'next/server'

async function addArticle(request: Request, response: Response) {
    const db = (await connectDB).db('board')

    try {
        const body = await request.body()
        // 제목 / 내용 빈칸일 경우 에러
        if (!body.title || !body.content) {
            return NextResponse.json(
                { message: '내용을 작성해주세요.' },
                { status: 400 },
            )
        }

        // DB 에러 예외 처리
        const date = new Date()
        const item = {
            ...body,
            regDate: `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`,
            userName: 'test account',
        }

        return await db.collection('article').insertOne(item)
    } catch (e) {
        console.error(e)
    }
}

export async function POST(request: Request, response: Response) {
    try {
        await addArticle(request, response)
        // 성공 시 메인 페이지로 이동
        return NextResponse.redirect('/', 302)
    } catch (e) {
        console.error(e)
        return NextResponse.json(
            { message: 'Error creating article' },
            { status: 500 },
        )
    }
}
