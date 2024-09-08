'use client'

import '@src/app/globals.scss'
import { Inter } from 'next/font/google'
import Header from '@layout/Header/Header'
import Footer from '@layout/Footer/Footer'
import React, { useEffect, useState } from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: Infinity,
                    },
                },
            }),
    )

    useEffect(() => {
        document.title = 'BOARD'
        const metaDescription = document.querySelector(
            'meta[name="description"]',
        )
        if (metaDescription) {
            metaDescription.setAttribute('content', '게시판 서비스')
        } else {
            const meta = document.createElement('meta')
            meta.name = 'description'
            meta.content = '게시판 서비스'
            document.head.appendChild(meta)
        }
    }, [])

    return (
        <html lang="en">
            <body className={inter.className}>
                <SessionProvider>
                    <Header />
                    <QueryClientProvider client={queryClient}>
                        <main>{children}</main>
                    </QueryClientProvider>
                    <Footer />
                </SessionProvider>
            </body>
        </html>
    )
}
