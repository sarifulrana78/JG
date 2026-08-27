# JontroGhor — Premium E-Commerce Platform

> Your ultimate destination for gadgets, fashion, and lifestyle products in Bangladesh.

[![Next.js](https://img.shields.io/badge/Next.js-16.x-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://typescriptlang.org)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748)](https://prisma.io)

---

## Features

- 3D Interactive UI powered by Three.js
- Secure authentication with Better Auth
- Persistent cart with Zustand state management
- bKash, Nagad, VISA, MasterCard, and COD payment support
- Full product management via Prisma ORM
- Premium dark theme with glassmorphism effects
- Fully responsive mobile-friendly design

## Getting Started

`ash
git clone https://github.com/sarifulrana78/JG.git
cd JG/jontroghor-app
npm install
cp .env.example .env
npx prisma migrate dev
npx prisma db seed
npm run dev
`

Open http://localhost:3000 in your browser.

## Tech Stack

| Category  | Technology                   |
|-----------|------------------------------|
| Framework | Next.js 16 (App Router)      |
| Language  | TypeScript                   |
| Styling   | Tailwind CSS v4              |
| 3D        | Three.js, @react-three/fiber |
| Animation | Framer Motion                |
| State     | Zustand                      |
| Database  | Prisma ORM + PostgreSQL      |
| Auth      | Better Auth                  |

## Environment Variables

`env
DATABASE_URL=postgresql://user:password@localhost:5432/jontroghor
BETTER_AUTH_SECRET=your-secret-key
BETTER_AUTH_URL=http://localhost:3000
`

## License

MIT (c) 2026 JontroGhor. All rights reserved.
