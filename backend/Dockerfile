# backend/Dockerfile
FROM node:20-alpine
WORKDIR /app
# Copy package files & install dependencies
COPY package*.json ./
RUN npm ci --production
# Copy application code
COPY . .
# Set environment variable inside container
ENV NODE_ENV=production
# Expose backend port
EXPOSE 8000
# Start backend
CMD ["node", "index.js"]
