# ---------- Build frontend ----------
FROM node:20 AS build-frontend
WORKDIR /app/client
COPY client/package.json client/package-lock.json ./
RUN npm install
COPY client .
RUN npm run build


# ---------- Build backend ----------
FROM node:20 AS build-backend
WORKDIR /app/server
COPY server/package.json server/package-lock.json ./
RUN npm install
COPY server .


# ---------- Production image ----------
FROM node:20 AS final
WORKDIR /usr

# Copy server
COPY --from=build-backend /app/server ./server

# Copy frontend DIST to correct path
COPY --from=build-frontend /app/client/dist ./client/dist

# Expose backend port
EXPOSE 8080

# Start backend
CMD ["node", "./server/index.js"]
