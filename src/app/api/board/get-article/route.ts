import { connectDB } from '@util/database'
import { NextResponse } from 'next/server'
import { ArticleItemFlag } from '@util/interface'
import { NextRequest } from '@node_modules/next/server'

export async function GET(req: NextRequest) {
    try {
        const db = (await connectDB).db('board')

        const { searchParams } = new URL(req.url)
        const page = parseInt(searchParams.get('page') || '1', 10)
        const limit = 10

        const response = await db
            .collection<ArticleItemFlag>('article')
            .find()
            .sort({ isBookmarked: -1, regDate: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .toArray()

        return NextResponse.json(response)
    } catch (e) {
        console.error(e)
    }
}
