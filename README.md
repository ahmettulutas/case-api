# 📖 What Does This Project Do?

This project has been designed to help candidates explore, test, and understand how the provided API works for the e-commerce case study we assign.

⚡ Key Features:
🆓 Free API Service:
Provides a fully functional REST API for the case study, built using Next.js API routes.

🛠️ Full-Stack Architecture:
A full-stack project with customizable API endpoints that candidates can extend and modify based on the case requirements.

📊 API Endpoints Available:

GET /getAll – Fetch all items
GET /getById/:id – Fetch a specific item by ID
POST /payment – Process payments
GET /payment – Gets payment contract
🔑 Note: All API calls must be made using the JWT token obtained from the /sign-in route. Include the token in the Authorization header as follows:
Authorization: Bearer <your-jwt-token>

💳 E-commerce Focus:
The API simulates a real-world e-commerce platform and can be used to build storefronts, cart features, and payment workflows.

🔐 Test with Default Credentials:
Candidates can use default credentials to test API calls without extra setup.

🎯 Frontend is Minimal:
The primary focus is on API functionality. The frontend can be optimized further using custom hooks and data-fetching libraries like react-query or SWR.

💡 Tip: Use tools like Postman or Insomnia to test API calls directly, or integrate them into a frontend of your choice!

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

