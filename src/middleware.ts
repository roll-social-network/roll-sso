import { hasAuthCookie } from '@/app/auth'
import type { NextRequest } from 'next/server'

const PROTECTED_ROUTES = ['/', '/authorize']

export const middleware = (request: NextRequest) => {
  if (PROTECTED_ROUTES.includes(request.nextUrl.pathname)) {
    if (!hasAuthCookie()) {
      const url = new URL('/login', request.url)
      const searchParams = new URLSearchParams()
      searchParams.append('next', request.url)
      return Response.redirect(`${url}?${searchParams}`)
    }
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image).*)'],
}
