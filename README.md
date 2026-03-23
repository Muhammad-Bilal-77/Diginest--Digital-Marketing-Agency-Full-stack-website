# Digi nest Website

Marketing agency website built with Vite, React, TypeScript, and Tailwind CSS.

## Tech Stack

- Vite
- React
- TypeScript
- Tailwind CSS
- shadcn/ui components

## Getting Started

```sh
npm install
npm run dev
```

## Backend (Node.js + MongoDB Atlas + Cloudinary)

The project now includes a backend in `server/` for:

- Admin authentication (`/api/auth/login`)
- CRUD for services, creators, and projects (`/api/services`, `/api/creators`, `/api/projects`)
- Image upload to Cloudinary (`/api/upload/image`)

### 1. Install backend dependencies

```sh
npm --prefix server install
```

### 2. Configure backend environment

Create `server/.env` from `server/.env.example` and set your real values:

- `MONGODB_URI` (MongoDB Atlas connection string)
- `JWT_SECRET`
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

### 3. Run backend

```sh
npm run dev:server
```

### 4. Run frontend

```sh
npm run dev
```

## Frontend API URL configuration

Frontend requests use static URLs in code (`src/lib/apiBase.ts`):

- Local frontend (`localhost` or `127.0.0.1`) -> `http://localhost:8000/api`
- Deployed frontend (any non-local host) -> `https://reliable-verene-umair-digital-68123777.koyeb.app/api`

## Notes

- Homepage remains static right now.
- Admin panel (`/admin-login`, `/admin`) is now dynamic and stores data in MongoDB.
- Public read endpoints are ready so homepage sections can be switched to dynamic data later without backend changes.

## Build

```sh
npm run build
npm run preview
```

## Test

```sh
npm run test
```
