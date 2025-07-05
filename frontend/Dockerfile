FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Fix permissions for node_modules
RUN chmod -R 755 node_modules

# Expose port
EXPOSE 5173

# Start development server using npx with explicit permissions
CMD ["npx", "--yes", "vite", "--host", "0.0.0.0"] 