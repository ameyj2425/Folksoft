# ---------- Build React client ----------
FROM node:18-alpine AS client-build
WORKDIR /app/client

COPY client/package*.json ./
RUN npm install

COPY client .
RUN npm run build

# ---------- Build server ----------
FROM node:18-alpine AS server
WORKDIR /usr/src/app

# Install server deps
COPY server/package*.json ./
RUN npm install --only=production

# Copy server source
COPY server .

# Copy built React app into /usr/src/app/client/dist
COPY --from=client-build /app/client/dist ./client/dist

EXPOSE 8080
CMD ["node", "index.js"]
