import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // If the user is navigating to the login page, allow them
  if (request.nextUrl.pathname.startsWith('/admin/login')) {
    return NextResponse.next()
  }

  // Check for the authentication cookie
  const authCookie = request.cookies.get('admin_auth')
  
  // If no valid auth cookie, redirect to /admin/login
  if (!authCookie || authCookie.value !== 'true') {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  // Allow access if cookie is present and valid
  return NextResponse.next()
}

// Protect all routes starting with /admin
export const config = {
  matcher: ['/admin/:path*'],
}
