import { NextResponse } from 'next/server';
import { auth } from '@/app/auth';

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth?.user;
  const isAdmin = req.auth?.user?.isAdmin;

  const protectedPaths = [
    '/dashboard',
    '/dashboard/users',
    '/dashboard/products'
  ];

  if (protectedPaths.some(path => pathname.startsWith(path)) && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (pathname.startsWith('/dashboard/users') && !isAdmin) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|static|.*\\..*|_next).*)'],
};