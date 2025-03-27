import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
	const AUTH = request.cookies.has('authToken')
	const PATH = request.nextUrl.pathname

	if (PATH.startsWith('/auth') && AUTH) {
		return NextResponse.redirect(new URL('/', request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/auth/:path*'],
}
