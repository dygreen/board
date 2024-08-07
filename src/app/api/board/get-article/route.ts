import { connectDB } from '@util/database'
import { NextResponse } from 'next/server'

async function getArticle() {
    try {
        const db = (await connectDB).db('board')
        return await db.collection('article').find().toArray()
    } catch (e) {
        console.error(e)
    }
}

export async function GET() {
    try {
        const response = await getArticle()
        return NextResponse.json(response)
    } catch (e) {
        console.error(e)
    }
}
