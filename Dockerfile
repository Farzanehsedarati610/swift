# Use official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy application files
COPY package.json package-lock.json ./
RUN npm install

COPY . .

# Expose port and start server
EXPOSE 3000
CMD ["node", "server.js"]

