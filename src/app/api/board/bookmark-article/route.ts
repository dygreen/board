import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@util/database'
import { ObjectId } from 'mongodb'

export async function POST(req: NextRequest) {
    try {
        const db = (await connectDB).db('board')
        const body = await req.json()

        await db
            .collection('article')
            .updateOne(
                { _id: new ObjectId(body.id as string) },
                { $set: { isBookmarked: body.isBookmarked } },
            )

        return NextResponse.json({ data: true })
    } catch (e) {
        return NextResponse.json(
            { message: '북마크 설정 중 오류가 발생했습니다.' },
            { status: 500 },
        )
    }
}
