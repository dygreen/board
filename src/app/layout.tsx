import './globals.scss'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '../../layout/Header/Header'
import Footer from '../../layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BOARD',
  description: '게시판 서비스',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header/>
        <main>
          {children}
        </main>
        <Footer/>
      </body>
    </html>
  )
}
