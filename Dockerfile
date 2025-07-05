# Use a lightweight Node.js image as the base
FROM node:20-alpine

# Set the working directory inside the container
# All subsequent commands will run relative to this directory
WORKDIR /app

# Copy package.json and package-lock.json first
# This allows Docker to cache the npm install step.
# If only application code changes, npm install won't re-run.
# These paths are relative to the build context (which is the root of your project: Quiz/)
COPY backend/package.json ./
COPY backend/package-lock.json ./

# Install Node.js dependencies
# `npm ci` is preferred over `npm install` in CI/CD and production for reproducible builds
RUN npm ci

# Copy the entire backend application code into a 'backend' subdirectory in the container
# This copies all your server.js, controllers, etc.
COPY backend/ ./backend/

# Copy the Prisma schema and migrations
COPY prisma/ ./prisma/

# Generate the Prisma client in the correct location
# The client needs to be generated where the server.js will look for it
RUN npx prisma generate

# Copy the generated Prisma client to the backend directory where server.js expects it
RUN cp -r node_modules/.prisma backend/node_modules/

# Expose the port your Express app runs on
EXPOSE 3000

# Define the command to run when the container starts
# It runs Prisma migrations and then starts your Node.js server.
# Ensure 'server.js' is the correct entry point within your 'backend' directory inside the container.
CMD ["sh", "-c", "npx prisma migrate deploy && node backend/server.js"]