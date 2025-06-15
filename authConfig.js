export const authConfig = {
    pages: {
        signIn: '/auth/signin',        
    },
    callbacks: {
        authorized({auth, request}) {
            const isloggedIn = auth?.user;
            const isOnDashboard = request.nexturl.pathname.startsWith('/dashboard');
            if (isOnDashboard) {
                if (isloggedIn) return true; // Allow access if logged in
                return false; // Redirect to sign-in page if not logged in
            } else if (isloggedIn) {
                return Response.redirect(new URL('/dashboard', request.url)); // Redirect to dashboard if logged in
            }
            return true; // Allow access to other pages
        }
    },
}