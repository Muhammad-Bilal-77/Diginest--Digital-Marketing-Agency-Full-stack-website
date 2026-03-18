# Use official Node.js runtime as base image
FROM node:20-alpine

# Set working directory in container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install production dependencies only
RUN npm install --omit=dev

# Copy the backend source code
COPY server ./server

# Expose port
EXPOSE 5000

# Set working directory to server
WORKDIR /app/server

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:' + (process.env.PORT || 5000) + '/api/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Start the backend server
CMD ["npm", "start"]
