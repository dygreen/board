import { WithId } from 'mongodb'

export interface ArticleItemFlag extends WithId<Document> {
    title: string
    content: string
    regDate: string
    userName: string
    modDate?: string
    isBookmarked?: boolean
}
