export const authConfig = {
  providers: [],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = auth?.user;
      const isAdmin = auth?.user?.isAdmin;
      const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard");

      // حماية مسارات الأدمن
      if (request.nextUrl.pathname.startsWith("/dashboard/users") && !isAdmin) {
        return false; // سيتم توجيهه إلى صفحة تسجيل الدخول
      }

      if (isOnDashboard) {
        return isLoggedIn;
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/dashboard", request.nextUrl));
      }
      return true;
    },
  },
};