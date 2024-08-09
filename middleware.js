/* middleware : 요청과 응답 사이에 간섭하는 코드*/
import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware(request) {
    // 로그인 안된 유저는 /write 페이지 접속 시 다른 페이지로 보내기
    if (request.nextUrl.pathname.startsWith('/write')) {
        // 현재 로그인한 유저 정보 출력
        const session = await getToken({ req: request })

        if (session == null) {
            return NextResponse.redirect(
                new URL('/api/auth/signin', request.url),
            )
        }
    }
}
