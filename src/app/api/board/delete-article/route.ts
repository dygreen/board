import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@util/database'
import { ObjectId } from 'mongodb'

export async function DELETE(req: NextRequest) {
    try {
        const db = (await connectDB).db('board')
        const { searchParams } = new URL(req.url)
        const _id = searchParams.get('id')

        await db
            .collection('article')
            .deleteOne({ _id: new ObjectId(_id as string) })

        // 성공 시 메인 페이지로 이동
        return NextResponse.json({ message: '게시글 삭제 완료' })
    } catch (e) {
        return NextResponse.json(
            { message: '게시글 삭제 중 오류가 발생했습니다.' },
            { status: 500 },
        )
    }
}
