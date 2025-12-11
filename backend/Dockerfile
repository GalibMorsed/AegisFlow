FROM node:20-alpine
WORKDIR /app

# copy manifests from backend folder (so they are found when context = repo root)
COPY backend/package*.json ./

RUN npm ci --production

# copy application code from backend into image
COPY backend/ ./

ENV NODE_ENV=production
EXPOSE 8000
CMD ["node", "index.js"]
