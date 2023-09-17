
## What does this project do?

This project has been created to allow our candidates to check how the api works for the case we provide them.

- This project has been created to allow our candidates to check, discover and try how the api works for the case we ask from them.
- We provide a free api service for our case study with this project. It is a full-stack project with fully customizable api endpoints.
- The focus was mainly on api endpoints rather than frontend optimization. Most of frontend can be optimized and developed with custom hooks and data fetching libraries.

## Technologies

- Nextjs
- Typescript
- Tailwind
- MongoDB

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

// import { withAuth } from "next-auth/middleware";

// // More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
// export default withAuth({
//   callbacks: {
//     authorized({ req, token }) {
//       // `/admin` requires admin role
//       if (req.nextUrl.pathname === "/dashboard") {
//         return token?.userRole === "admin";
//       }
//       // `/me` only requires the user to be logged in
//       return !!token;
//     },
//   },
// });

// export const config = { matcher: ["/dashboard"] };