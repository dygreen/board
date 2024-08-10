import { connectDB } from '@util/database'
import { NextResponse } from 'next/server'

async function getArticle() {
    try {
        const db = (await connectDB).db('board')
        const response = await db.collection('article').find().toArray()

        return NextResponse.json(response)
    } catch (e) {
        console.error(e)
    }
}

export async function GET() {
    try {
        return await getArticle()
    } catch (e) {
        console.error(e)
    }
}
