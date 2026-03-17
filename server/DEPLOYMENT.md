# Deployment Guide - Backend on Koyeb

## Prerequisites
- Koyeb account (https://koyeb.com)
- Docker installed locally (optional, but recommended for testing)
- MongoDB Atlas database (or any MongoDB URI)
- Cloudinary account for image uploads
- Git repository with this code

## Environment Variables Required

Set these environment variables in your Koyeb deployment:

```
# Database
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>

# JWT
JWT_SECRET=your-secret-jwt-key-min-32-characters

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-strong-admin-password

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Client Origin (Frontend URL)
CLIENT_ORIGIN=https://your-frontend-domain.com

# Port (optional, defaults to 5000)
PORT=5000
```

## Deployment Steps on Koyeb

### 1. Build Docker Image (Optional - Test Locally)
```bash
cd server
docker build -t prestige-pixel-backend:latest .
docker run -p 5000:5000 \
  -e MONGODB_URI="..." \
  -e JWT_SECRET="..." \
  -e ADMIN_USERNAME="admin" \
  -e ADMIN_PASSWORD="..." \
  -e CLOUDINARY_CLOUD_NAME="..." \
  -e CLOUDINARY_API_KEY="..." \
  -e CLOUDINARY_API_SECRET="..." \
  -e CLIENT_ORIGIN="http://localhost:8080" \
  prestige-pixel-backend:latest
```

### 2. Deploy on Koyeb

#### Option A: Using Git Integration (Recommended)
1. Push code to GitHub (including the Dockerfile)
2. Log in to Koyeb dashboard
3. Click "Create" → "Deploy a git repository"
4. Connect your GitHub account
5. Select the repository
6. Configure:
   - **Repository**: Your repo name
   - **Branch**: main (or your branch)
   - **Builder**: Dockerfile
   - **Dockerfile location**: `/server/Dockerfile`
7. Add Environment Variables:
   - Click "Environment" tab
   - Add all required environment variables from above
8. Set port: 5000
9. Click "Deploy"

#### Option B: Using Koyeb CLI
```bash
# Install Koyeb CLI
npm install -g koyeb

# Authenticate
koyeb auth login

# Deploy
koyeb apps create prestige-pixel-backend \
  --git <your-repo-url> \
  --git-branch main \
  --docker-entrypoint "npm start" \
  --env MONGODB_URI="..." \
  --env JWT_SECRET="..." \
  --env ADMIN_USERNAME="admin" \
  --env ADMIN_PASSWORD="..." \
  --env CLOUDINARY_CLOUD_NAME="..." \
  --env CLOUDINARY_API_KEY="..." \
  --env CLOUDINARY_API_SECRET="..." \
  --env CLIENT_ORIGIN="https://your-frontend.com"
```

## Environment Variables Setup on Koyeb Dashboard

1. Go to your app → Settings
2. Navigate to "Environment" or "Environment variables"
3. Add each variable with its value
4. Save/Redeploy

## Important Notes

- **MONGODB_URI**: Use MongoDB Atlas for cloud database
  - Create cluster: https://cloud.mongodb.com
  - Get connection string: Cluster → Connect → Connect your application
  
- **CLOUDINARY**: Get credentials from https://cloudinary.com
  - Cloud name, API Key, and API Secret in Account Settings

- **CLIENT_ORIGIN**: Set to your frontend URL (e.g., `https://yourdomain.com`)
  - This enables CORS for your frontend

- **JWT_SECRET**: Use a strong, random string (min 32 characters)
  - Generate: `openssl rand -base64 32`

## Port Configuration

- Koyeb will automatically assign a public port
- Your app listens on internal port 5000 (configurable via PORT env var)
- No need to expose port in Dockerfile for Koyeb (but it's included)

## Health Check

The Dockerfile includes a health check endpoint at `/api/health` which Koyeb will use to monitor your app.

## Testing Deployment

Once deployed, test with:
```bash
curl https://your-app.koyeb.app/api/health
# Should respond: {"status":"ok"}
```

## Troubleshooting

### Build Fails
- Check Dockerfile at `/server/Dockerfile`
- Ensure all source files are committed to git
- Check Node.js version compatibility

### App Won't Start
- Verify all required environment variables are set
- Check logs in Koyeb dashboard
- Ensure MongoDB URI is correct
- Verify Cloudinary credentials

### CORS Errors
- Set `CLIENT_ORIGIN` to your frontend domain
- Include `https://` or `http://` in the URL

### Database Connection Issues
- Test MongoDB URI locally first
- Ensure Koyeb IP is whitelisted in MongoDB Atlas (or set to 0.0.0.0/0)
- Verify credentials in connection string

## Monitoring

After deployment:
1. Check Koyeb dashboard for logs
2. Monitor application with Koyeb's built-in metrics
3. Set up alerts for errors
4. Test API endpoints regularly

## Updating Your App

To update your backend:
1. Push changes to GitHub
2. Koyeb will automatically detect and rebuild (if auto-deploy is enabled)
3. Or manually redeploy from Koyeb dashboard

---

For more help, visit: https://docs.koyeb.com
