# Docker Setup Guide - Backend Only

This Docker configuration deploys **only the backend API** (Node.js + Express). The frontend (React + Vite) is deployed separately.

## Prerequisites

- Docker installed on your machine
- Docker Compose (usually comes with Docker Desktop)
- Environment variables file (.env) in the `server/` directory

## Environment Setup

1. **Copy the Environment Template**:
   ```bash
   cp server/.env.example server/.env
   ```

2. **Update the `.env` file** with your actual credentials:
   - MongoDB URI
   - JWT Secret
   - Admin credentials
   - Cloudinary API keys
   - Frontend origin URL

## Building the Docker Image

### Option 1: Using Docker Compose (Recommended)

```bash
# Build the backend image
docker-compose build

# Run the backend container
docker-compose up
```

### Option 2: Using Docker CLI Directly

```bash
# Build the image
docker build -t prestige-pixel-backend:latest .

# Run the container
docker run -p 5000:5000 \
  --env-file server/.env \
  prestige-pixel-backend:latest
```

## What the Docker Setup Does

- Installs Node.js dependencies (production only)
- Copies the backend source code
- Exposes port 5000 for API access
- Runs Express server with health checks

## File Structure in Docker

```
/app/
└── server/              # Backend Express app
    ├── src/
    ├── node_modules/
    └── package.json
```

## Accessing the API

Once running:
- **API**: http://localhost:5000/api/ (local with docker-compose)
- **API**: http://your-koyeb-domain.com:8000/api/ (on Koyeb)
- **Health Check**: http://localhost:5000/api/health (local)
- **Health Check**: http://your-koyeb-domain.com:8000/api/health (on Koyeb)

## Environment Variables

See `server/.env.example` for all required environment variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `JWT_SECRET` | JWT signing secret | `your-secret-key-min-32-characters` |
| `ADMIN_USERNAME` | Admin login username | `admin` |
| `ADMIN_PASSWORD` | Admin login password | `strong-password` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | `your-cloud-name` |
| `CLOUDINARY_API_KEY` | Cloudinary API key | `your-api-key` |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | `your-api-secret` |
| `CLIENT_ORIGIN` | Frontend URL for CORS | `http://localhost:3000` |
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment | `production` or `development` |

## Troubleshooting

### Build Fails
- Ensure all environment variables are set correctly
- Check that you have sufficient disk space
- Try rebuilding: `docker-compose build --no-cache`

### Container Won't Start
- Check logs: `docker-compose logs -f`
- Verify MongoDB connection string
- Ensure all required environment variables are set

### API Returns CORS Errors
- Make sure `CLIENT_ORIGIN` environment variable points to your frontend URL
- Update the CORS configuration in `server/src/index.js` if needed

## Development vs Production

### Development (Locally)
```bash
npm run dev:server   # Backend dev server on :5000 with hot reload
```

### Production (Docker)
```bash
docker-compose up    # Backend API server on :5000
```

## Deployment

For production deployment on services like Koyeb:

1. Push the code to a Git repository
2. Connect the repository to your Docker host
3. Set environment variables in the deployment platform (no need to set PORT - defaults to 8000)
4. The Docker build will automatically:
   - Install dependencies
   - Start the backend server on port 8000 (Koyeb's standard)
5. Access the API at: `https://your-koyeb-domain.com/api/`

## Docker Image Optimization

The Dockerfile:
- Uses Node.js 20 Alpine for minimal image size
- Installs only production dependencies (`--omit=dev`)
- Includes health checks for monitoring
- Optimized layer caching for faster builds

## Frontend Deployment

The frontend should be deployed separately:
- Locally: Use `npm run dev` to start the Vite dev server on port 8080
- Production: Build with `npm run build` and deploy to a static hosting service (Vercel, Netlify, AWS S3, etc.)

Make sure to update the `CLIENT_ORIGIN` environment variable to point to where your frontend is deployed.

## API Endpoints

See `server/src/routes/` for all available API routes:
- `/api/auth/*` - Authentication endpoints
- `/api/*` - Content endpoints
- `/api/upload/*` - File upload endpoints
- `/api/settings/*` - Settings endpoints
- `/api/about/*` - About section endpoints
- `/api/health` - Health check endpoint

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Express.js Documentation](https://expressjs.com/)
- [Vite Build Documentation](https://vitejs.dev/guide/build.html)
