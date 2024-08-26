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
        const userName = formData.get('userName')
        const isBookmarked = formData.get('isBookmarked')

        if (
            session === null ||
            (session.user.name !== userName && session.user.name !== 'Admin')
        ) {
            return NextResponse.json(
                { message: '게시글 수정 권한이 없습니다.' },
                { status: 403 },
            )
        }

        if (!title || !content) {
            return NextResponse.json(
                { message: '내용을 작성해주세요.' },
                { status: 400 },
            )
        }

        const date = new Date()
        const item = {
            title,
            content,
            regDate,
            isBookmarked: isBookmarked === 'true',
            userName: session?.user?.name,
            modDate: `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()} ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`,
        }

        await db
            .collection('article')
            .updateOne({ _id: new ObjectId(_id as string) }, { $set: item })

        return NextResponse.json({
            message: '게시글이 성공적으로 수정되었습니다.',
        })
    } catch (e) {
        return NextResponse.json(
            { message: '게시글 수정 중 오류가 발생했습니다.' },
            { status: 500 },
        )
    }
}
