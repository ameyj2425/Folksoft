# Dockerfile for backend in /server folder

FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy backend package files
COPY server/package*.json ./

# Install production dependencies
RUN npm install --production

# Copy backend source code
COPY server/. .

# Expose backend port
EXPOSE 3000

# Start the server (uses "start" script from server/package.json)
CMD ["npm", "start"]
