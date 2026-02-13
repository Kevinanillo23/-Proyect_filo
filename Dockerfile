# --- STAGE 1: Build Frontend ---
FROM node:20-alpine AS build-frontend

WORKDIR /app/frontend

# Argument to set the API URL during build time
ARG VITE_API_URL=/api
ENV VITE_API_URL=$VITE_API_URL

# Copy package files first for better caching
COPY Revista_Front/frontend/package*.json ./
RUN npm ci

# Copy the rest of the frontend source
COPY Revista_Front/frontend/ ./

# Build the frontend (outputs to /app/frontend/dist)
RUN npm run build


# --- STAGE 2: Production Server ---
FROM node:20-alpine

# Set to production
ENV NODE_ENV=production

WORKDIR /app

# Ensure we have a clean directory for the non-root user
RUN chown -R node:node /app

# Switch to the default non-root node user provided by the image
USER node

# Copy backend dependencies
COPY --chown=node:node Revista_Back/backend/package*.json ./
RUN npm ci --only=production

# Copy backend source code
COPY --chown=node:node Revista_Back/backend/ ./

# Copy the built frontend from Stage 1 to a 'public' folder inside the backend
# Your Express server should serve static files from this folder
COPY --chown=node:node --from=build-frontend /app/frontend/dist ./public

# Expose the application port
EXPOSE 5000

# Start the application
CMD ["node", "server.js"]
