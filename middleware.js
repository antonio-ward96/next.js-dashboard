import { NextResponse } from 'next/server';
import { auth } from '@/app/auth';

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth?.user;
  const isAdmin = req.auth?.user?.isAdmin;

  // المسارات المحمية
  const protectedPaths = [
    '/dashboard',
    '/dashboard/users',
    '/dashboard/products'
  ];

  // إذا كان يحاول الوصول إلى مسار محمي ولم يكن مسجل الدخول
  if (protectedPaths.some(path => pathname.startsWith(path)) && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // إذا حاول الوصول إلى صفحة المستخدمين ولم يكن أدمن
  if (pathname.startsWith('/dashboard/users') && !isAdmin) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|static|.*\\..*|_next).*)'],
};