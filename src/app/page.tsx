'use client'

import React, { useEffect } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import ArticleItem from '@components/board/ArticleItem'
import { useInView } from 'react-intersection-observer'
import Loading from '@src/app/loading'

export default function Home() {
    const [ref, inView] = useInView()

    const handleGetArticle = async (page: number) => {
        try {
            const response = await fetch(`/api/board/get-article?page=${page}`)
            const data = await response.json()

            if (response.status === 200) {
                return data
            } else if (response.status === 500) {
                alert(data.message)
            }
        } catch (e) {
            console.error(e)
        }
    }

    const { data, fetchNextPage, isLoading } = useInfiniteQuery({
        queryKey: ['articles'],
        queryFn: ({ pageParam = 1 }) => handleGetArticle(pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length === 10 ? allPages.length + 1 : undefined
        },
    })

    useEffect(() => {
        if (inView) fetchNextPage()
    }, [inView])

    if (isLoading) return <Loading />
    return (
        <>
            <ArticleItem articles={data?.pages.flat() || []} />
            <div ref={ref}></div>
        </>
    )
}
