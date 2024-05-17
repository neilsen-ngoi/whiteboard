import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
// import { withClerkMiddleware } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";

// export default withClerkMiddleware((req: any) => {
//   // Exclude the catch-all route and its children from middleware protection
//   if (req.nextUrl.pathname.startsWith("/(.*)")) {
//     return NextResponse.next();
//   }

//   // Protect all other routes
//   return NextResponse.next();
// });

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)", "/(.*)"]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
